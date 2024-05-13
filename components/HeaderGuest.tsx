import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import Link from "next/link"


export default function HeaderGuest() {
    return (
        <div className='flex-row flex bg-gray-700 text-white w-full h-16 items-center justify-between p-2'>
            <AiOutlineMenu className="w-8 h-8" />
            <div className="w-full items-center justify-center flex">
                <h2>Ukuhumusha Chat</h2>
            </div>
        </div >
    )
}