"use client"
import { RedirectorContext } from "@/components/redirector-provider";
import { useSession } from "@/components/session-provider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
    const session = useSession()
    const router = useRouter()
    const {setLoading} : any = useContext(RedirectorContext)
    console.log(session)
    return (
        <div className="bg-background h-full w-full">
            <p>{session.status} and signed in as {session.name}</p>
            <h1>Balls~</h1>
            <h2>Balls~</h2>
            <h3>Balls~</h3>
            <p>Balls~</p>
            <button className="default" onClick={
                () => {
                    setLoading(true)
                    localStorage.removeItem("session")
                    router.push("/auth/login")
                    setLoading(false)
                }
            }>sign out</button>
        </div>
    );
}
