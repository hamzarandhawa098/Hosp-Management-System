import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCD6YhegHTMqqlBKC54ulULpAf17pAiK-E",
  authDomain: "hospital-management-812b3.firebaseapp.com",
  projectId: "hospital-management-812b3",
  storageBucket: "hospital-management-812b3.firebasestorage.app",
  messagingSenderId: "925578858127",
  appId: "1:925578858127:web:1903d39ea25b560a19aafa",
};
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
