"use client"
import { useEffect, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { BsTranslate } from "react-icons/bs"
import { db, useAuth, autoNameChat, handleUpdateChat } from "@/utils/Firebase"
import { collection, doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { slideFromBottom } from "@/utils/FramerVariants"
import { handleChat, handleTranslate } from "@/utils/ApiHandlers"
import LanguageSelector from "./LanguageSelector"
import Header from "./Header"
import CopyPaste from "./CopyPaste"


export default function ChatDynamic({ chatId }: { chatId: string }) {

    const [messages, setMessages] = useState<any>([])//messages in EN
    const [translatedMessages, setTranslatedMessages] = useState<any>([])//messages in obscure foreign language
    const [input, setInput] = useState("")
    const [target, setTarget] = useState("zu")

    const { user, signedIn } = useAuth();

    //get current chat data from firestore
    useEffect(() => {
        if (!signedIn) return
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");

        const getChatMessages = async () => {
            const chatRef = doc(subCollectionRef, chatId);
            const docSnap = await getDoc(chatRef);
            if (docSnap.exists()) {
                setMessages(docSnap.data().messages)
            } else {
                console.log("No such document!");
                console.log(chatId)
            }
        }
        getChatMessages()
    }, [signedIn])

    //update messages in firestore, auto name the chat using completions route handler every 5 messages
    useEffect(() => {
        if (!signedIn) return
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");

        if (chatId !== "") {
            handleUpdateChat(subCollectionRef, chatId, messages)
        }

        const handleNameChat = async () => {
            const chatRef = doc(subCollectionRef, chatId);
            const messageContents = messages.map((message: any) => `${message.role}: ${message.content}\n`).toString()
            autoNameChat(chatRef, messageContents)
        }

        if (messages.length % 5 === 0) {
            handleNameChat()
        }
    }, [messages])

    const messageComponents = messages.map((message: any, index: any) => {
        let content = message.content;
        if (typeof content !== 'string') {
            content = String(content);
        }
        const contentArray = content.split('\n').map((text: string, i: number) => (
            <p key={i}>{text}</p>
        ));
        return (
            <div key={index} className={` w-full flex flex-col gap-2 p-2 ${message.role == "assistant" ? "bg-gray-100" : ""}`}>
                <span className="w-full flex flex-row justify-between relative">
                    <b>{message.role}</b>
                    <CopyPaste text={message.content} />
                </span>
                {contentArray}
            </div>
        )
    })


    //translate and handle chat functionality
    useEffect(() => {
        if (translatedMessages.length === 0) return
        if (translatedMessages[translatedMessages.length - 1].role === "assistant") return
        handleChat(translatedMessages).then(async (res) => {
            setTranslatedMessages([...translatedMessages, { role: "assistant", content: res[0] }])
            const translatedOutput = await handleTranslate(res, "en")
            setMessages([...messages, { role: "assistant", content: translatedOutput }])
        })
    }, [translatedMessages])

    //normal chat
    /* useEffect(() => {
        if (messages.length === 0) return
        if (messages[messages.length - 1].role === "assistant") return
        handleChat(messages).then(async (res) => {
            setMessages([...messages, { role: "assistant", content: res }])
        })
    }, [messages]) */


    const handleSubmitInput = async (e: any) => {
        e.preventDefault()
        setMessages([...messages, { role: "user", content: input }])
        const translatedInput = await handleTranslate(input, target)
        setTranslatedMessages([...translatedMessages, { role: "user", content: translatedInput[0] }])
        setInput("")
    }

    //debugging
    useEffect(() => {
        //console.log(messages)
        console.log(translatedMessages)
        //console.log(input)
    }, [messages, translatedMessages, input])

    return (
        <div className="flex w-full h-screen flex-col items-center justify-between">
            <Header chatId={chatId} />

            <div className="h-full overflow-y-scroll">
                {messageComponents}

                <div className="flex flex-row items-center justify-center pb-28">
                    <BsTranslate className="text-2xl text-gray-500 " />

                    <motion.div variants={slideFromBottom}
                        initial={"hidden"}
                        animate={"active"}
                        exit={"hidden"}
                        className="flex flex-row gap-4 items-center justify-center">
                        <p className="text-xs text-gray-500">Translate through:</p>
                        <LanguageSelector target={target} setTarget={setTarget} />
                    </motion.div>

                </div>
            </div>
            <div className=" flex flex-col w-full p-2 gap-4 bg-gray-100 border-t-[1px] border-gray-300">

                <form onSubmit={(e) => handleSubmitInput(e)} className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Send a Message" className="px-4 w-full h-12 rounded-xl shadow-d" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" ><AiOutlineSend className="w-8 h-8 text-gray-400" /></button>
                </form>
                <p className="text-xs text-gray-500">Free research preview. Ukuhumusha will produce inaccurate information about people, places, or facts. <u>Ukuhumusha September 25 Version</u></p>
            </div>

        </div>
    )
}