import Link from "next/link";

function Page() {
    return (
        <div className="flex items-center justify-between flex-col w-full h-full">
            <div>
                <h1>Privacy Policy</h1>
                <p>We are mining all your data and selling it to Zuck.</p>
                <p>Did you honestly expect privacy when using the internet</p>
            </div>
            <div className="flex flex-row gap-2 text-sm text-gray-400 mb-8">
                <Link href="/">Home</Link>
                |
                <Link href="/legal">Terms of use</Link>
            </div>
        </div>
    );
}

export default Page;