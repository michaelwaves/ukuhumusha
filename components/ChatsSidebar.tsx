"use client"

import { getDocs, collection, doc } from "firebase/firestore"
import { db, useAuth } from "@/utils/Firebase";
import { useState } from "react";

export default function ChatsSidebar() {

    const { user, signedIn } = useAuth();
    const [chats, setChats] = useState<any>([])
    async function getChats() {
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");
        const querySnapshot = await getDocs(subCollectionRef);
        const chatsArray: any[] = []
        querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            chatsArray.push(doc.data())
        });
        setChats(chatsArray)
    }

    if (signedIn) {
        getChats()
    }

    return (
        <div className="w-60 h-screen bg-gray-700">
            <p className="text-white">New Chat</p>
            <div className="flex flex-col">

            </div>
        </div>
    )
}