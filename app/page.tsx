"use client"
import { useSession } from "@/components/session-provider";

export default function Home() {
    const session = useSession()
    console.log(session)
    return (
        <div className="bg-background">
        <p>{session.status}</p>
            <h1>Balls~</h1>
            <h2>Balls~</h2>
            <h3>Balls~</h3>
            <p>Balls~</p>
        </div>
    );
}
