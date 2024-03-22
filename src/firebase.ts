// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOmYKSw6Ov4MjCJWr-JHw_L9-VgYqq6Lw",
  authDomain: "realtor-clone-ad08c.firebaseapp.com",
  projectId: "realtor-clone-ad08c",
  storageBucket: "realtor-clone-ad08c.appspot.com",
  messagingSenderId: "76591665801",
  appId: "1:76591665801:web:a323b8b55c4f4e85e0ac58"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore()
