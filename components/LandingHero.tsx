"use client"

import { AnimatedText } from "./AnimatedText"
import { LANDING_PAGE_TEXT } from "@/data/LandingPageText"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { slideFromBottom } from "@/utils/FramerVariants"

export default function LandingHero() {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const TIME_INTERVAL = 18000

    const components = LANDING_PAGE_TEXT.map((text, i) => {
        const heading = <h1 className="text-4xl text-p-3">{text.text}</h1>

        const subtextComponents = text.subtexts.map((subtext, subI) => {
            return <AnimatedText key={subI} text={subtext} className="text-4xl text-p-3" />
        })


        return (

            <motion.div
                variants={slideFromBottom}
                initial="hidden"
                animate="active"
                exit="hidden"
                key={i} className="flex flex-col gap-2">
                {heading}
                {subtextComponents[subIndex]}
            </motion.div>

        )

    })

    useEffect(() => {
        const timer = setTimeout(() => {
            //const randomIndex = Math.floor(Math.random() * LANDING_PAGE_TEXT.length)
            setIndex(index => (index + 1) % LANDING_PAGE_TEXT.length)
            console.log(index)
        }, TIME_INTERVAL)

        return () => {
            clearTimeout(timer)
        }

    }, [index])

    useEffect(() => {
        const timer = setTimeout(() => {
            //for a random index instead of incrementing index:
            //const randomIndex = Math.floor(Math.random() * LANDING_PAGE_TEXT.length)
            setSubIndex(subIndex => (subIndex + 1) % 3)
        }, TIME_INTERVAL / 3)

        return () => {
            clearTimeout(timer)
        }

    }, [subIndex])


    /* 
        useEffect(() => {
            const timer = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * subtexts.length)
                const randomSubtext = subtexts[randomIndex]
                setAnimatedText({ text: randomSubtext, subtext: '' })
            }, 1000)
     
            return () => {
                clearInterval(timer)
            }
        }
            , [subtexts])
     
     */

    return (
        <div className=" hidden w-full h-screen bg-p-5 md:flex items-center justify-start p-4">
            {components[index]}
        </div>
    )
}