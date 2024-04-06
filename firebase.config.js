// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo2vWSOkLrqPSjrNI0rhjvYXk8GnuVK58",
  authDomain: "universe-9f27a.firebaseapp.com",
  projectId: "universe-9f27a",
  storageBucket: "universe-9f27a.appspot.com",
  messagingSenderId: "911430277810",
  appId: "1:911430277810:web:4d688b2db4e9d2eead07ab",
  measurementId: "G-JGZ1HGJXRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);