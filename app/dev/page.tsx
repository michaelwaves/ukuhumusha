"use client"

import ChatsSidebar from "@/components/ChatsSidebar"

export default function Page() {
    const handleTestCompletion = async (text: string) => {
        const response = await fetch("/api/completions", {
            method: 'POST',
            body: JSON.stringify({ prompt: text }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(await response.json()
        )

    }
    return (
        <>
            <ChatsSidebar />
            <button
                onClick={() => handleTestCompletion("write a short description summarizing the following chat, no more than 8 words: hello world")}
            >
                Test Completions Route
            </button>
        </>
    )
}