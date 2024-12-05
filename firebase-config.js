// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBgfb5w2YB4gY3PD3PsBChjUQe3wXvClI",
  authDomain: "documentshare-47991.firebaseapp.com",
  projectId: "documentshare-47991",
  storageBucket: "documentshare-47991.firebasestorage.app",
  messagingSenderId: "184890716987",
  appId: "1:184890716987:web:d27d23104b026df456fd1e",
  measurementId: "G-PL0QYQMGM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
