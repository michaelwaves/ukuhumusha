// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-6lmqmvMQdXzBBEdXjs_shbRVyyaq1jg",
    authDomain: "ukuhumusha-ee798.firebaseapp.com",
    projectId: "ukuhumusha-ee798",
    storageBucket: "ukuhumusha-ee798.appspot.com",
    messagingSenderId: "185182129697",
    appId: "1:185182129697:web:8113768b88c4ff34855d60",
    measurementId: "G-X5H82FX88W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const useAuth = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setSignedIn(!!user);
        });
        return unsubscribe;
    }, []);
    return { user, signedIn };
}