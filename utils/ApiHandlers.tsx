export const handleTranslate = async (text: string, target: string) => {
    const response = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ text, target }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}
export const handleChat = async (messages: any[]) => {
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

export const handleCompletion = async (prompt: string) => {
    const response = await fetch("/api/completions", {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}