"use client"
import LoginPrompt from "@/components/LoginPrompt"
import { useAuth } from "@/utils/Firebase"
import Chat from "@/components/Chat"
import Header from "@/components/Header"

export default function Page() {
    const { signedIn } = useAuth();
    return (
        <main className="flex h-screen flex-col items-center justify-between">
            <Header />
            {signedIn ? <Chat /> : <LoginPrompt />}
        </main>
    )
}