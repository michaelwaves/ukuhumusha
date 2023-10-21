"use client"
import { motion, AnimatePresence } from "framer-motion";
import { BiCopyAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { copyPopup } from "@/utils/FramerVariants";

export default function CopyPaste({ text }: { text: string }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const [message, setMessage] = useState<string>("Copied!")

    const copyText = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
            setCopySuccess(true);
            setMessage("Copied!")
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setMessage("Failed!")
        }
    };
    useEffect(() => {
        if (copySuccess) {
            setTimeout(() => {
                setCopySuccess(false);
            }, 500);
        }
    }, [copySuccess]);
    return (
        <>
            <BiCopyAlt className="text-gray-400 w-6 h-6 hover:cursor-pointer" onClick={() => copyText(text)} />
            <AnimatePresence>
                {copySuccess &&
                    <motion.div
                        variants={copyPopup}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                        className="absolute -bottom-2 right-6 z-10 p-2 rounded-md bg-gray-700 text-white">
                        <p>{message}</p>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}