import { StyleSheet } from "react-native";

import MyStack from "./MyStack";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export default function App() {
  return <MyStack />;
}

const styles = StyleSheet.create({});
