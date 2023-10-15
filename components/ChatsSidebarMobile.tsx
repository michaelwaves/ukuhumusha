"use client"

import { getDocs, collection, doc } from "firebase/firestore"
import { db, useAuth } from "@/utils/Firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners"
import { BsChatLeft } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineMenu, AiOutlineCloseSquare } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion";
import { slideFromLeft } from "@/utils/FramerVariants";
export default function ChatsSidebarMobile() {

    const { user, signedIn } = useAuth();
    const [chats, setChats] = useState<any>([])
    const [openChatMenu, setOpenChatMenu] = useState<boolean>(false)

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
            <Link key={chat.id} href={`/chat/${chat.id}`} className="flex flex-row items-center justify-start gap-2 h-12 w-full px-2 hover:bg-gray-700 rounded-xl ">
                <BsChatLeft className="text-white w-4 h-4" />
                <p className="text-white w-full whitespace-nowrap overflow-x-hidden">
                    {chat.name}
                </p>
            </Link>
        )
    })

    return (
        <div className="md:hidden block">

            <AnimatePresence>
                {openChatMenu ?
                    <motion.div className="relative w-60 h-screen bg-gray-800 pt-2"
                        variants={slideFromLeft}
                        initial="hidden"
                        animate="active"
                        exit="hidden"
                    >
                        <Link href={"/chat"} className="text-white items-center flex flex-row gap-2 p-2 border-[1px] rounded-md border-gray-400">
                            <AiOutlinePlus />
                            <p>New Chat</p>
                        </Link>
                        <div className="relative flex flex-col items-center justify-start px-2 py-2">
                            <div className="w-12 h-full absolute top-0 right-0 bg-gradient-to-l from-gray-800"></div>
                            {chats.length > 0 ? chatSelectorComponents : <MoonLoader />}
                        </div>
                        <div className="absolute top-2 right-0 translate-x-full bg-gray-800"
                            onClick={() => setOpenChatMenu(false)}
                        >
                            <AiOutlineCloseSquare className="z-20 text-white w-8 h-8" />
                        </div>
                    </motion.div>
                    : <AiOutlineMenu className="z-20 text-white fixed top-2 left-2 w-8 h-8"
                        onClick={() => setOpenChatMenu(true)}
                    />}
            </AnimatePresence>
        </div>
    )
}