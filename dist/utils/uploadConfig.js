"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrl = exports.deleteFromGCS = exports.uploadToGCS = exports.upload = void 0;
const storage_1 = require("@google-cloud/storage");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = new storage_1.Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEYFILE_PATH,
});
const bucketName = process.env.GCS_BUCKET_NAME || "my-app-uploads";
const bucket = storage.bucket(bucketName);
const multerStorage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
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
    }
    else {
        cb(new Error(`File type ${file.mimetype} is not allowed`));
    }
};
exports.upload = (0, multer_1.default)({
    storage: multerStorage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter,
});
const uploadToGCS = (file, folder = "uploads") => {
    return new Promise((resolve, reject) => {
        if (!file)
            return reject(new Error("No file provided"));
        const ext = path_1.default.extname(file.originalname);
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
                // await blob.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
                resolve(publicUrl);
            }
            catch (err) {
                console.error("FAILED TO MAKE PUBLIC:", err);
                reject(new Error(`File uploaded, but could not make public: ${err.message}`));
            }
        });
        blobStream.end(file.buffer);
    });
};
exports.uploadToGCS = uploadToGCS;
const deleteFromGCS = async (fileUrl) => {
    try {
        const fileName = fileUrl.replace(`https://storage.googleapis.com/${bucketName}/`, "");
        await bucket.file(fileName).delete();
    }
    catch (err) {
        console.error("Error deleting file from GCS:", err);
        throw err;
    }
};
exports.deleteFromGCS = deleteFromGCS;
const getSignedUrl = async (fileName, expiresInMinutes = 60) => {
    const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + expiresInMinutes * 60 * 1000,
    };
    const [url] = await bucket.file(fileName).getSignedUrl(options);
    return url;
};
exports.getSignedUrl = getSignedUrl;
