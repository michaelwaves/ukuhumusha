"use client"
import { useEffect, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { BiCopyAlt } from "react-icons/bi"
import { BsTranslate } from "react-icons/bs"
import { db, useAuth, autoNameChat, handleAddChat, checkExistingChat, handleUpdateChat } from "@/utils/Firebase"
import { collection, doc } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { slideFromBottom, copyPopup } from "@/utils/FramerVariants"
import { handleChat, handleTranslate } from "@/utils/ApiHandlers"
import LanguageSelector from "./LanguageSelector"
import Header from "./Header"
import CopyPaste from "./CopyPaste"

const INITIAL_MESSAGES = [
    {
        role: "assistant",
        content: "hello"
    }
]

export default function Chat() {
    const [messages, setMessages] = useState<any>(INITIAL_MESSAGES)//messages in EN
    const [translatedMessages, setTranslatedMessages] = useState<any>([])//messages in obscure foreign language
    const [input, setInput] = useState("")
    const [target, setTarget] = useState("zu")


    const { user, signedIn } = useAuth();
    const [currentDate, setCurrentDate] = useState<string>("")//using current date to ISO string as unique id for chat
    const [existingChat, setExistingChat] = useState<any>({})
    const [copySuccess, setCopySuccess] = useState(false)

    //add new chat to firestore if there isn't already a chat with name "New Chat" and no messages
    useEffect(() => {
        if (!signedIn) return
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");

        checkExistingChat(subCollectionRef).then((res) => {
            if (!res.chatExists) {
                handleAddChat(subCollectionRef).then((res) => {
                    setCurrentDate(res)
                })
            } else {
                setExistingChat(res.existingChat);
                setCurrentDate(res.chatId);
            }
        })

    }, [signedIn])

    //update messages in firestore, auto name the chat using completions route handler on first response from api (3 messages)
    useEffect(() => {
        if (!signedIn) return
        const subCollectionRef = collection(doc(db, "users", user.uid), "chats");

        if (currentDate !== "") {
            handleUpdateChat(subCollectionRef, currentDate, messages)
        }

        const handleNameChat = async () => {
            const chatRef = doc(subCollectionRef, currentDate);
            const messageContents = messages.map((message: any) => `${message.role}: ${message.content}\n`).toString()
            autoNameChat(chatRef, messageContents)
        }

        if (messages.length == 3) {
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
            <motion.div
                variants={slideFromBottom}
                initial={"hidden"}
                animate={"active"}
                key={index} className={`relative w-full flex flex-col gap-2 p-2 ${message.role == "assistant" ? "bg-gray-100" : ""}`}>
                <span className="w-full flex flex-row justify-between">
                    <b>{message.role}</b>
                    <CopyPaste text={message.content} />
                </span>
                {contentArray}
            </motion.div>
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
            <Header chatId={currentDate} />

            <div className="overflow-y-scroll h-full w-full">
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
            <div className="flex flex-col w-full p-2 gap-4 bg-gray-100 border-t-[1px] border-gray-300">

                <form onSubmit={(e) => handleSubmitInput(e)} className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Send a Message" className="px-4 w-full h-12 rounded-xl shadow-d" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" ><AiOutlineSend className="w-8 h-8 text-gray-400" /></button>
                </form>
                <p className="text-xs text-gray-500">Free research preview. Ukuhumusha will produce inaccurate information about people, places, or facts. <u>Ukuhumusha September 25 Version</u></p>
            </div>

        </div>
    )
}