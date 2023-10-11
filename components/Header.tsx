import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"
import Login from "./Login"


export default function Header() {
    return (
        <div className='flex-row flex bg-gray-700 text-white w-full h-16 items-center justify-between p-2'>
            <AiOutlineMenu className="w-8 h-8" />
            <h2>New Chat</h2>
            <div className="flex flex-row gap-2">
                <AiOutlinePlus className="w-8 h-8" />
                <Login />
            </div>
        </div >
    )
}