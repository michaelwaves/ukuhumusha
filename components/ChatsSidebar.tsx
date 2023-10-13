"use client"

import { getDocs, collection, doc } from "firebase/firestore"
import { db, useAuth } from "@/utils/Firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners"
import { BsChatLeft } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
export default function ChatsSidebar() {

    const { user, signedIn } = useAuth();
    const [chats, setChats] = useState<any>([])

    async function getChats() {
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");
        const querySnapshot = await getDocs(subCollectionRef);
        let chatsArray: any[] = []
        querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            chatsArray.push({ id: doc.id, ...doc.data() })
        });
        console.log(chatsArray)
        setChats(chatsArray)
    }

    useEffect(() => {
        if (signedIn) {
            getChats()
        }
    }, [signedIn])

    useEffect(() => {
        console.log(chats)
    }, [chats])

    const chatSelectorComponents = chats.map((chat: any) => {
        return (
            <Link href={`/chat/${chat.id}`} className="flex flex-row items-center justify-start gap-2 h-12 w-full px-2 hover:bg-gray-700 rounded-xl ">
                <BsChatLeft className="text-white w-4 h-4" />
                <p className="text-white">{chat.name}</p>
            </Link>
        )
    })

    return (
        <div className="w-60 h-screen bg-gray-800 p-2">
            <Link href={"/chat"} className="text-white items-center flex flex-row gap-2 p-2 border-[1px] rounded-md border-gray-400">
                <AiOutlinePlus />
                <p>New Chat</p>
            </Link>
            <div className="relative flex flex-col items-center justify-center px-2 py-2">
                <div className="w-12 h-full absolute top-0 right-0 bg-gradient-to-l from-gray-800"></div>
                {chats.length > 0 ? chatSelectorComponents : <MoonLoader />}
            </div>
        </div>
    )
}