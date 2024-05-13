"use client"
import LoginPrompt from "@/components/LoginPrompt"
import { useAuth } from "@/utils/Firebase"
import Chat from "@/components/Chat"

export default function Page() {
    const { signedIn } = useAuth();
    return (
        <main className="w-full">
            {signedIn ? <Chat /> : <LoginPrompt />}
        </main>
    )
}