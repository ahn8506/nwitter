import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDvyCrNKrGN4iOYnsxod-UGss5a2ep_bms",
    authDomain: "nwitter-ab1f0.firebaseapp.com",
    projectId: "nwitter-ab1f0",
    storageBucket: "nwitter-ab1f0.appspot.com",
    messagingSenderId: "708414183217",
    appId: "1:708414183217:web:d701bce57f50cb9f524210"

};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();

