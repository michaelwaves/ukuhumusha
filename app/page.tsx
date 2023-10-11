import Chat from "@/components/Chat"
import Header from "@/components/Header"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between">
      <Header />
      <Chat />
    </main>
  )
}
