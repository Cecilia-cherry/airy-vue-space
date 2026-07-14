import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "ai-studio-applet-webapp-7eadd",
  appId: "1:891496322257:web:eddf1cb9801c8fa6c2a1f0",
  apiKey: "AIzaSyC2it2myKsiZGFjpSZ8MCh5CZAHI9LD1Rg",
  authDomain: "ai-studio-applet-webapp-7eadd.firebaseapp.com",
  storageBucket: "ai-studio-applet-webapp-7eadd.firebasestorage.app",
  messagingSenderId: "891496322257",
  measurementId: "",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
