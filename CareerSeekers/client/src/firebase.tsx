// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Update the type declaration for import.meta
declare global {
  interface ImportMeta {
    env: {
      [x: string]: any;
      VITE_FIREBASE_API_KEY: string;
    };
  }
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "careerseekers-12918.firebaseapp.com",
  projectId: "careerseekers-12918",
  storageBucket: "careerseekers-12918.appspot.com",
  messagingSenderId: "642398024915",
  appId: "1:642398024915:web:5abd1cc93e496ea723d026"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);