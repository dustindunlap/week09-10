// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzvsMMHVDMIQ50QJuGkv51WulBkA-cT6Y",
  authDomain: "week07-b89d8.firebaseapp.com",
  projectId: "week07-b89d8",
  storageBucket: "week07-b89d8.appspot.com",
  messagingSenderId: "618564289018",
  appId: "1:618564289018:web:da2033c67867f3f5ffa443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };