import Link from "next/link";
function Page() {
    return (
        <div className="flex items-center justify-between flex-col w-full h-full">
            <div>
                <h1>Legal</h1>
                <p>Ukuhumusha is just for jokes.</p>
                <p>Don&#39;t actually do anything crazy or illegal.</p>
            </div>
            <div className="flex flex-row gap-2 text-sm text-gray-400 mb-8">
                <Link href="/">Home</Link>
                |
                <Link href="/legal/privacy">Privacy Policy</Link>
            </div>
        </div>
    );
}

export default Page;