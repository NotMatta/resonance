"use client"
import PostCreate from "@/components/post-create";
import { RedirectorContext } from "@/components/redirector-provider";
import { useSession } from "@/components/session-provider";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
    const session = useSession()
    const router = useRouter()
    const {setLoading} : any = useContext(RedirectorContext)
    return (
        <div className="bg-background h-full w-full max-w-4xl mx-auto overflow-scroll flex flex-col">
            <PostCreate/>
        </div>
    );
}
