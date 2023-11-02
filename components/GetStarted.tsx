"use client"

import { BsCircleFill } from "react-icons/bs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { handleSignIn } from "@/utils/Firebase"
import { useAuth } from "@/utils/Firebase"
import { useEffect } from "react"


export default function GetStarted() {
    const router = useRouter();
    const { user, signedIn } = useAuth()

    useEffect(() => {
        if (signedIn) {
            router.push("/chat")
        }
    }, [signedIn])

    return (
        <div className="w-full h-full bg-p-5">
            <div className="flex relative items-center justify-center flex-col gap-2 w-full h-full rounded-t-3xl bg-white">
                <span className="flex flex-row items-center justify-center gap-2 absolute top-6 left-8">
                    <h1>Ukuhumusha Chat</h1>
                    <BsCircleFill />
                </span>
                <h1>Get Started</h1>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={handleSignIn} className="login-button">Login</button>
                    <button onClick={handleSignIn} className="login-button">Sign Up</button>
                </div>
                <Link href={"/guest"} className="text-center">Proceed as Guest</Link>
                <a href="https://arxiv.org/pdf/2310.02446.pdf" target="_blank" className="text-sm text-gray-400">About</a>
                <div className="absolute bottom-0 w-full flex items-center justify-center h-20">
                    <div className="flex flex-row gap-2 text-sm text-gray-400">
                        <Link href="/legal">Terms of use</Link>
                        |
                        <Link href="/legal/privacy">Privacy Policy</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}