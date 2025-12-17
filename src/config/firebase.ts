import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

try {
  const serviceAccountRaw = process.env.FIREBASE_CREDENTIALS;

  if (!serviceAccountRaw) {
    throw new Error("❌ FIREBASE_CREDENTIALS tidak ditemukan di .env atau Environment Variable!");
  }

  // Karena "tanpa base64", kita langsung parse string JSON-nya
  const serviceAccount = JSON.parse(serviceAccountRaw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin berhasil connect (Mode: Raw JSON)!");
  }

} catch (error) {
  console.error("❌ Gagal connect Firebase:", error);
  // Tips debugging:
  console.error("Pastikan FIREBASE_CREDENTIALS di .env dijadikan 1 baris tanpa spasi/enter.");
}

export default admin;