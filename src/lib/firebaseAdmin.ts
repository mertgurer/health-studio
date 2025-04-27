// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: JSON.parse(
                process.env.FIREBASE_PRIVATE_KEY || ""
            ).privateKey?.replace(/\\n/g, "\n"),
        }),
    });
}

export const adminDb = getFirestore();
