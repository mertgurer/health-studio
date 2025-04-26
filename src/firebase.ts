import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || "");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, getDownloadURL };
