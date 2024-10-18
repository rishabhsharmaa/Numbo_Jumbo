// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPuNqYUACSTpmVxuF-soMqhvjrVuKjbfc",
    authDomain: "numbojumbo-b1838.firebaseapp.com",
    projectId: "numbojumbo-b1838",
    storageBucket: "numbojumbo-b1838.appspot.com",
    messagingSenderId: "986806651827",
    appId: "1:986806651827:web:a38d09311a79b71a1dd9c6",
    measurementId: "G-1Z5NNHP84D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
