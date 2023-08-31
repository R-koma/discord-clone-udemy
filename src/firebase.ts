import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDl3M7uxQUFFg8LELTDQQ_eSotAEx5yL0",
  authDomain: "discord-clone-udemy-bd604.firebaseapp.com",
  projectId: "discord-clone-udemy-bd604",
  storageBucket: "discord-clone-udemy-bd604.appspot.com",
  messagingSenderId: "957309052984",
  appId: "1:957309052984:web:4133b5eaa45449db085ecd",
};

const app = initializeApp(firebaseConfig);
// データベースにアクセスするためのコード
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db};