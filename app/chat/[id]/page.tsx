import ChatDynamic from "@/components/ChatDynamic"

export default function Page({ params }: { params: { id: string } }) {
    const chatId = decodeURIComponent(params.id)
    return (
        <main className="w-full">
            <ChatDynamic chatId={chatId} />
        </main>
    )
}