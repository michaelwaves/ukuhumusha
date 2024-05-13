// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, collection, addDoc, getDocs, CollectionReference, updateDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { handleCompletion } from "./ApiHandlers";
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

const provider = new GoogleAuthProvider();

export const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
        const u = result.user;
        checkAndAddUsertoFirestore(u);
    }).catch((error) => {
        console.log(error)
    })
}

export const handleSignOut = () => {
    auth.signOut().then(() => {
        console.log("signed out")
    }).catch((error) => {
        console.log(error)
    })
}

export const checkAndAddUsertoFirestore = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const subCollectionRef = collection(userRef, "chats");
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
        });
        await addDoc(subCollectionRef, {
            name: "First Chat",
            createdAt: new Date(),
            messages: []
        })
    }
}

export const autoNameChat = (chatRef: any, messageContents: string) => {
    const PROMPT = `write a short description summarizing the following chat, no more than 5 words: ${messageContents}`
    handleCompletion(PROMPT).then((res) => {
        const name = res
        //console.log(name)
        setDoc(chatRef, { name: name }, { merge: true })
    })
}


export const checkExistingChat = async (subCollectionRef: CollectionReference) => {
    const querySnapshot = await getDocs(subCollectionRef);

    let chatExists = false
    let chatId = ""
    let existingChat = null

    querySnapshot.forEach((doc: any) => {
        const chat = doc.data();
        console.log(chat)
        if (chat.messages.length === 0) {
            chatId = doc.id
            existingChat = chat
            chatExists = true
            console.log(chatExists)
            return; // Exit loop if a chat with no messages is found
        }
    });
    console.log(chatExists)
    return { chatExists, chatId, existingChat }
}

export const handleAddChat = async (subCollectionRef: CollectionReference) => {
    const date = new Date();
    const dateString = date.toISOString();//unique id every time
    await setDoc(doc(subCollectionRef, dateString), {
        name: "New Chat",
        createdAt: date,
        messages: []
    })
    return dateString
}

export const handleUpdateChat = async (subCollectionRef: CollectionReference, docId: string, messages: any[]) => {
    const chatRef = doc(subCollectionRef, docId);
    try {
        await updateDoc(chatRef, {
            messages: messages
        });
    } catch (e) {
        console.log(e)
    }
}

export async function addTestChat(){
    const date = new Date();
    const dateString = date.toISOString();
    const subCollectionRef = collection(doc(db,"users","lyK9QtFr7LPO5pq08wHnLhr3VSS2"),"chats")
    const chatData = {
        name:"test chat",
        messages:[
            {
                role:"assistant",
                content:"hello world"
            }
        ],
        createdAt:date
    }
    await setDoc(doc(subCollectionRef,"test"),chatData)
    console.log("added test document to chat lyK9QtFr7LPO5pq08wHnLhr3VSS2")
}