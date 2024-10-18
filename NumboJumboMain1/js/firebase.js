// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtBQJS_WUtXN9arsDR48CfRTFaFKayqiQ",
  authDomain: "numbojumbo-b7bc8.firebaseapp.com",
  projectId: "numbojumbo-b7bc8",
  storageBucket: "numbojumbo-b7bc8.appspot.com",
  messagingSenderId: "1043668512376",
  appId: "1:1043668512376:web:a5f7ff33f0407365d5078d",
  measurementId: "G-K2SN41FRCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);