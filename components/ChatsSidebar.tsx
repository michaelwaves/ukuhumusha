"use client"

import { getDocs, collection, doc, deleteDoc } from "firebase/firestore"
import { db, useAuth } from "@/utils/Firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners"
import { BsChatLeft } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineMenu, AiOutlineDelete } from "react-icons/ai"
import { addTestChat } from "@/utils/Firebase";
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

    async function deleteChat(chatId:string){
        const subCollectionRef = collection(doc(db,"users", user.uid), "chats");
        const docToDelete = doc(subCollectionRef,chatId);
        try{
            await deleteDoc(docToDelete)
            console.log(`deleted doc ${docToDelete}`)
        }catch(e){
            console.error("Failed to delete document: " + e)
        }
    }

   

    useEffect(() => {
        if (signedIn) {
            getChats()
            //console.log(user.uid)
        }
    }, [signedIn])

    useEffect(() => {
        console.log(chats)
    }, [chats])

    const chatSelectorComponents = chats.map((chat: any) => {
        return (
            <Link key={chat.id} href={`/chat/${chat.id}`} className="flex flex-row items-center justify-start gap-2 h-12 w-full px-2 hover:bg-gray-700 rounded-xl ">
                <BsChatLeft className="text-white w-4 h-4" />
                <p className="text-white w-full whitespace-nowrap overflow-x-hidden">
                    {chat.name}
                </p>
                <AiOutlineDelete className="text-white w-8 h-8 z-10 hover:bg-gray-400 rounded-lg opacity-50 hover:opacity-100"
                onClick={()=>deleteChat(chat.id)}
                />
            </Link>
        )
    })

    return (
        <>
            <div className="md:block hidden w-80 h-screen overflow-y-scroll scrollbar bg-gray-800 ">
                <Link href={"/chat"} className="text-white items-center flex flex-row gap-2 p-2 border-[1px] rounded-md border-gray-400">
                    <AiOutlinePlus />
                    <p>New Chat</p>
                </Link>
                <div className="relative flex flex-col items-center justify-start px-2 py-2">
                    <div className="w-12 h-auto absolute top-0 right-0 bg-gradient-to-l from-gray-800"></div>
                    {chats.length > 0 ? chatSelectorComponents : <MoonLoader />}
                </div>
            </div>
        </>
    )
}