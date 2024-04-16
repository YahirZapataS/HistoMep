// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuZRFBvU5J18caIQ4_4uCtr9qyv3elEg4",
    authDomain: "histomepweb-1da8a.firebaseapp.com",
    projectId: "histomepweb-1da8a",
    storageBucket: "histomepweb-1da8a.appspot.com",
    messagingSenderId: "636631667334",
    appId: "1:636631667334:web:9c742737a75dc09a257707",
    measurementId: "G-85M55XBC0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };