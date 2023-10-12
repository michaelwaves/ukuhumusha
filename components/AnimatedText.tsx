"use client"

import { Variants, motion } from "framer-motion"
import { slideFromBottom, slideFromTop, scaleFromLeft, shrinkVanish } from "@/utils/FramerVariants"
import { BsCircleFill } from "react-icons/bs"
import { useEffect, useState } from "react"
type AnimatedTextProps = {
    text: string
    className?: string
}

export const AnimatedText = ({ text, className = '' }: AnimatedTextProps) => {
    const [circle, setCircle] = useState(true)
    const length = text.split(" ").length
    const staggerDelay = 0.2
    const time = length * staggerDelay

    useEffect(() => {
        const timer = setTimeout(() => {
            setCircle(false)
        }, time * 1000 + 1000)

        return () => {
            clearTimeout(timer)
        }

    }, [])
    return (
        <p className="flex flex-row items-center">
            <span className="sr-only">{text}</span>
            <motion.span
                initial="hidden"
                animate="active"
                exit="hidden"
                transition={{ staggerChildren: 0.2 }}
                variants={slideFromTop}
                className={`${className} w-fit`}
                aria-hidden>
                {text.split(" ").map((word, index) => (
                    <motion.span variants={scaleFromLeft as Variants} className="" key={index}>
                        {word}
                        <span className="">&nbsp;</span>
                    </motion.span>
                ))}
            </motion.span>
            <motion.span variants={shrinkVanish} animate={circle ? "active" : "hidden"}>
                <BsCircleFill className="text-p-3 w-8 h-8" />
            </motion.span>
        </p>

    )
}