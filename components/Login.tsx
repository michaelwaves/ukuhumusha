"use client"
import { useState } from "react"
import { AiFillGoogleCircle } from "react-icons/ai"
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/utils/Firebase";
import { handleSignIn, handleSignOut } from "@/utils/Firebase";

export default function Login() {
    const { user, signedIn } = useAuth();
    const [popup, setPopup] = useState(false);

    const myButton = signedIn ?
        <button onClick={() => setPopup(!popup)}>
            <Image src={user?.photoURL} alt="pfp" height={100} width={100}
                className="w-8 h-8 rounded-full"
            />
        </button> : <button onClick={() => handleSignIn()}>
            <AiFillGoogleCircle className="text-4xl" />
        </button>

    const popupComponent = <div className="w-40 text-center text-gray-700 bg-white p-2 rounded-md shadow-lg flex flex-col gap-2 absolute top-0 left-0 -translate-x-full z-50">
        <button onClick={() => { handleSignOut(), setPopup(false) }}>Sign Out</button>
        <Link href="/profile">Edit Profile</Link>
    </div>
    return (
        <div className="relative">
            {myButton}
            {popup ? popupComponent : null}
        </div>
    )

}

