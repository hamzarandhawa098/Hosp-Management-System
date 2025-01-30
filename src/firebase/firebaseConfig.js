import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDm_Fy1OFM42zwDjXNbWQq30ZKcx1R_HNA",
  authDomain: "hospital-management-syst-23152.firebaseapp.com",
  projectId: "hospital-management-syst-23152",
  storageBucket: "hospital-management-syst-23152.firebasestorage.app",
  messagingSenderId: "862834886262",
  appId: "1:862834886262:web:626d1765f96276f35d8157",
  measurementId: "G-R0HMYHWWDZ"
  
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);



