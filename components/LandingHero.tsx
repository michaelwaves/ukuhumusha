"use client"

import { AnimatedText } from "./AnimatedText"
import { LANDING_PAGE_TEXT } from "@/data/LandingPageText"
import { useEffect, useState } from "react"

export default function LandingHero() {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)

    const heading = <h1 className="text-2xl text-p-3">{LANDING_PAGE_TEXT[index].text}</h1>

    const subtextComponents = LANDING_PAGE_TEXT[index].subtexts.map((subtext, index) => {
        return <AnimatedText key={index} text={subtext} className="text-2xl text-p-3" />
    })

    /*     useEffect(() => {
            const timer = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * LANDING_PAGE_TEXT.length)
                const randomText = LANDING_PAGE_TEXT[randomIndex]
                setHeading(randomText.text)
                setSubtexts(randomText.subtexts)
            }, 3000)
    
            return () => {
                clearInterval(timer)
            }
        }, [])
    
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
        <div className="w-full h-screen bg-p-5 flex items-center justify-start p-4">
            <div className="flex flex-col gap-2">
                {heading}
                {subtextComponents}
            </div>
        </div>
    )
}