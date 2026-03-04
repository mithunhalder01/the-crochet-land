import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAtCWhvp8X98Pq2tM5qLI8Ch0DVaTgnJI",
  authDomain: "thecrochetland-88cc4.firebaseapp.com",
  projectId: "thecrochetland-88cc4",
  storageBucket: "thecrochetland-88cc4.appspot.com",
  messagingSenderId: "435034288698",
  appId: "1:435034288698:web:e77b04ea656408a1bb3b03",
  measurementId: "G-319QY92T6E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
