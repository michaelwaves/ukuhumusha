import { BsCircleFill } from "react-icons/bs"
import Link from "next/link"

export default function UkuhumushaHeader() {
    return (
        <div className="w-full h-16 relative">
            <Link href="/" className="flex flex-row items-center justify-center gap-2 absolute top-6 left-8">
                <h1>Ukuhumusha Chat</h1>
                <BsCircleFill />
            </Link>
        </div>
    )
}