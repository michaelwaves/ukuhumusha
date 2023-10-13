import GetStarted from "@/components/GetStarted"
import LandingHero from "@/components/LandingHero"
export default function Home() {
  return (
    <main className="flex h-screen flex-row items-center justify-between">
      <LandingHero />
      <GetStarted />
    </main>
  )
}