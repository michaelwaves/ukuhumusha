"use client"

import { motion } from "framer-motion"
import { slideFromTop } from "@/utils/FramerVariants"
type AnimatedTextProps = {
    text: string
    className?: string
}

export const AnimatedTextFluid = ({ text, className = '' }: AnimatedTextProps) => {
    return (

        <p>
            <span className="sr-only">{text}</span>
            <motion.span
                initial="hidden"
                animate="active"
                exit="hidden"
                transition={{ staggerChildren: 0.1 }}
                variants={slideFromTop}
                className={className}
                aria-hidden>
                {text.split(" ").map((word, index) => (
                    <motion.span className="inline-block" key={index}>
                        {word.split('').map((letter, index) => (
                            <motion.span variants={slideFromTop} key={index} className="inline-block">{letter}</motion.span>))}
                        <span className="inline-block">&nbsp;</span>
                    </motion.span>
                ))}
            </motion.span>
        </p>

    )
}