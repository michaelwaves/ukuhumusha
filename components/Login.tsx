"use client"
import { useContext, useEffect, useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/utils/Firebase";
import { AiFillGoogleCircle } from "react-icons/ai"
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    const [user, setUser] = useState<any>(null);
    const [signedIn, setSignedIn] = useState(false);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setSignedIn(!!user);
        });
        return unsubscribe;
    }, []);

    const checkAndAddUsertoFirestore = async (user: any) => {
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

    const provider = new GoogleAuthProvider();

    const handleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            checkAndAddUsertoFirestore(user);
            setUser(user);
            setSignedIn(true);
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSignOut = () => {
        auth.signOut().then(() => {
            console.log("signed out")
            setUser(null);
            setSignedIn(false);
            setPopup(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const myButton = signedIn ?
        <button onClick={() => setPopup(!popup)}>
            <Image src={user?.photoURL} alt="pfp" height={100} width={100}
                className="w-8 h-8 rounded-full"
            />
        </button> : <button onClick={() => handleSignIn()}>
            <AiFillGoogleCircle className="text-4xl" />
        </button>

    const popupComponent = <div className="w-40 text-center text-gray-700 bg-white p-2 rounded-md shadow-lg flex flex-col gap-2 absolute top-0 left-0 -translate-x-full">
        <button onClick={() => handleSignOut()}>Sign Out</button>
        <Link href="/profile">Edit Profile</Link>
    </div>
    return (
        <div className="relative">
            {myButton}
            {popup ? popupComponent : null}
        </div>
    )

}

