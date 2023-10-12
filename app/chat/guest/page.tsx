import ChatGuest from "@/components/ChatGuest"
import HeaderGuest from "@/components/HeaderGuest"
export default function Page() {
    return (
        <main className="flex h-screen flex-col items-center justify-between">
            <HeaderGuest />
            <ChatGuest />
        </main>
    )
}