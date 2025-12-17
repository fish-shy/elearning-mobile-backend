import { Storage } from "@google-cloud/storage";
import multer from "multer";
import path from "path";

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  // keyFilename: process.env.GCS_KEYFILE_PATH,
});

const bucketName = process.env.GCS_BUCKET_NAME || "my-app-uploads";
const bucket = storage.bucket(bucketName);

const multerStorage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/x-rar-compressed",
    "application/vnd.rar",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

export const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter,
});

export const uploadToGCS = (
  file: Express.Multer.File,
  folder: string = "uploads"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));

    const ext = path.extname(file.originalname);
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}${ext}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    blobStream.on("error", (err) => reject(err));

    blobStream.on("finish", async () => {
      try {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        resolve(publicUrl);
      } catch (err: any) {
        console.error("FAILED TO MAKE PUBLIC:", err);
        reject(
          new Error(`File uploaded, but could not make public: ${err.message}`)
        );
      }
    });

    blobStream.end(file.buffer);
  });
};

export const deleteFromGCS = async (fileUrl: string): Promise<void> => {
  try {
    const fileName = fileUrl.replace(
      `https://storage.googleapis.com/${bucketName}/`,
      ""
    );
    await bucket.file(fileName).delete();
  } catch (err: any) {
    console.error("Error deleting file from GCS:", err);
    throw err;
  }
};

export const getSignedUrl = async (
  fileName: string,
  expiresInMinutes: number = 60
): Promise<string> => {
  const options = {
    version: "v4" as const,
    action: "read" as const,
    expires: Date.now() + expiresInMinutes * 60 * 1000,
  };

  const [url] = await bucket.file(fileName).getSignedUrl(options);
  return url;
};
