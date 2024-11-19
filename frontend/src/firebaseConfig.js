import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDmY_ma_EO7W2ttmIvsCVTFF6XEAI-Xx7s",
    authDomain: "universidad-fdff7.firebaseapp.com",
    projectId: "universidad-fdff7",
    storageBucket: "universidad-fdff7.firebasestorage.app",
    messagingSenderId: "356831181677",
    appId: "1:356831181677:web:366aa966134fa24e103864",
    measurementId: "G-TXCC295PEB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);