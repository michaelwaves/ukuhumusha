import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai"


export default function Header() {
    return (
        <div className='flex-row flex bg-gray-700 text-white w-full h-16 items-center justify-between p-2'>
            <AiOutlineMenu />
            <h2>New Chat</h2>
            <AiOutlinePlus />
        </div>
    )
}