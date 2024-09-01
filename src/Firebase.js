// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcpPLeSsNlGvLcZqqukJeDSjMHkVY3w-Y",
  authDomain: "customer-retention-12345.firebaseapp.com",
  projectId: "customer-retention-12345",
  storageBucket: "customer-retention-12345.appspot.com",
  messagingSenderId: "961787053393",
  appId: "1:961787053393:web:4b74db0c092925184eff70",
  measurementId: "G-JKK3FEKSR4"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };


