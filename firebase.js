import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADBiOd0jtdpRYXfiJHpE8-XTl1KiR31m8",
  authDomain: "furino-app.firebaseapp.com",
  databaseURL:
    "https://furino-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "furino-app",
  storageBucket: "furino-app.firebasestorage.app",
  messagingSenderId: "772945413198",
  appId: "1:772945413198:web:98f2be77366135b62baf1f",
  measurementId: "G-R11B3KRCEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
