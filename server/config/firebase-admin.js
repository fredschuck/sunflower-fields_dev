import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

export const auth = getAuth(app);
