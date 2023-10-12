"use client"
import { use, useEffect, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { BsTranslate } from "react-icons/bs"
import { db, useAuth } from "@/utils/Firebase"
import { setDoc, updateDoc, collection, doc, addDoc } from "firebase/firestore"
import { LANGUAGE_CODES } from "@/utils/LanguageCodes"
import { motion, AnimatePresence } from "framer-motion"
import { slideFromBottom, slideFromTop } from "@/utils/FramerVariants"
import { handleChat, handleTranslate } from "@/utils/ApiHandlers"
import { useRouter } from "next/navigation"


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
    const [translateOpen, setTranslateOpen] = useState(true)



    const languageOptions = LANGUAGE_CODES.map((language: any, index: any) => {
        return <option className="text-gray-700" key={index} value={language.code}>{language.language}</option>
    })

    const handleLanguageChange = (e: any) => {
        setTarget(e.target.value)
    }

    const languageSelect = <select className="w-24 h-12 rounded-xl shadow-d" value={target} onChange={(e) => handleLanguageChange(e)}>{languageOptions}</select>

    const { user, signedIn } = useAuth();
    const [currentDate, setCurrentDate] = useState<string>("")
    const router = useRouter()

    //add new chat to firestore
    /*    useEffect(() => {
           if (!signedIn) return
           const subCollectionRef = collection(doc(db, "users", user.uid), "chats");
           const handleAddChat = async () => {
               const date = new Date();
               const dateString = date.toISOString();//unique id every time
               await setDoc(doc(subCollectionRef, dateString), {
                   name: "New Chat",
                   createdAt: date,
                   messages: []
               })
               setCurrentDate(dateString)
           }
           handleAddChat()
       }, [signedIn]) */

    const messageComponents = messages.map((message: any, index: any) => {
        let content = message.content;
        if (typeof content !== 'string') {
            content = String(content);
        }
        const contentArray = content.split('\n').map((text: string, i: number) => (
            <p key={i}>{text}</p>
        ));
        return (
            <div key={index} className={`w-full flex flex-col gap-2 p-2 ${message.role == "assistant" ? "bg-gray-100" : ""}`}>
                <b>{message.role}</b>
                {contentArray}
            </div>
        )
    })


    //translated chat
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
        <div className="w-full h-full">
            <div className="">
                {messageComponents}
            </div>
            <div className="flex flex-row items-center justify-center pb-28">
                <BsTranslate className="text-2xl text-gray-500 " onClick={() => setTranslateOpen(!translateOpen)} />

                <motion.div variants={slideFromBottom}
                    initial={"hidden"}
                    animate={"active"}
                    exit={"hidden"}
                    onClick={() => setTranslateOpen(!translateOpen)}
                    className="flex flex-row gap-4 items-center justify-center">
                    <p className="text-xs text-gray-500">Translate through:</p>
                    {languageSelect}
                </motion.div>

            </div>
            <div className="fixed bottom-0 left-0 flex flex-col w-full p-2 gap-4 bg-gray-100 border-t-[1px] border-gray-300">

                <form onSubmit={(e) => handleSubmitInput(e)} className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Send a Message" className="px-4 w-full h-12 rounded-xl shadow-d" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" ><AiOutlineSend className="w-8 h-8 text-gray-400" /></button>
                </form>
                <p className="text-xs text-gray-500">Free research preview. Ukuhumusha will produce inaccurate information about people, places, or facts. <u>Ukuhumusha September 25 Version</u></p>
            </div>

        </div>
    )
}