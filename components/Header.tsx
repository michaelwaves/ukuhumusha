import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import Login from "./Login"
import { useAuth, db } from "@/utils/Firebase";
import { doc, collection, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";


export default function Header({ chatId }: { chatId: string }) {
    const { signedIn, user } = useAuth();
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        if (!signedIn) return
        if (chatId === "") return
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");
        const chatRef = doc(subCollectionRef, chatId);
        const getChatName = async () => {
            const docSnap = await getDoc(chatRef);
            if (docSnap.exists()) {
                setTitle(docSnap.data().name)
            } else {
                setTitle("New Chat")
            }
        }
        getChatName()
    }, [signedIn, chatId])


    return (
        <div className='flex-row flex bg-gray-700 text-white w-full h-16 items-center justify-between p-2'>
            <AiOutlineMenu className="w-8 h-8" />
            <h2>{title}</h2>
            <div className="flex flex-row gap-2">
                <AiOutlinePlus className="w-8 h-8" />
                <Login />
            </div>
        </div >
    )
}