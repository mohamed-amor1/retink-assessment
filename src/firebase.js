// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvuIl0uuFpmQW-srAkl5dUN1Iaj27nECc",
  authDomain: "retink-assessment.firebaseapp.com",
  projectId: "retink-assessment",
  storageBucket: "retink-assessment.appspot.com",
  messagingSenderId: "250949449770",
  appId: "1:250949449770:web:348071099bc4ef73b22b53",
  measurementId: "G-SC4NJ9ZZ1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
