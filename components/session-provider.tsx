"use client"
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { checkStorage } from "@/utils/clientUtils";
import { SetStateAction, Dispatch } from "react";
import { RedirectorContext } from "./redirector-provider";
import { useRouter } from "next/navigation";

interface sessionType {
    name: string,
    email: string,
    pfp: string,
    status: string,
    token: string,
    userId: number | null
}
const Husk : sessionType = {
    name: "",
    email: "",
    pfp: "",
    status: "loading",
    token: "",
    userId: null
}

interface HuskContextType {
    session: sessionType | undefined,
    setSession: Dispatch<SetStateAction<sessionType>> | undefined
    setLoading: Dispatch<SetStateAction<boolean>> | undefined
}

const SessionContext: any = createContext(undefined)

const SessionProvider = ({children} : {children: React.ReactNode}) => {
    const [session,setSession] = useState<sessionType>(Husk)
    const [Load,setLoading] = useState(true)
    const router = useRouter()
    //@ts-ignore
    const setRedirect = useContext(RedirectorContext).setLoading
    
    useEffect(() => {
        if (Load){
            setSession({...Husk,status:"loading"})
            setRedirect(true)
            checkStorage().then((res : sessionType) => {
                setSession(res)
                if (res.status == "authenticated"){
                    router.push("/main")
                    return
                }
                router.push("/auth/login")
            })
            console.log("fetched")
            setRedirect(false)
            setLoading(false)
        }
    },[Load,setLoading,setRedirect,router])

    return (
        <SessionContext.Provider value={{session,setSession,setLoading}}>
        {children}
        </SessionContext.Provider>
    )
}

const useSession = () => {
    const {session} = useContext(SessionContext)
    return session
}

const useRefreshAuth  = () => {
    return useContext(SessionContext).setLoading
}

const Login = async(data: {email:string,password:string}) => {
    try{
        const res = await axios.post("/api/auth/login",data)
        const newSession : sessionType = {
            name: res.data.name,
            email: res.data.email,
            pfp: res.data.pfp,
            userId: res.data.userId,
            token: res.data.token,
            status: "authenticated"
        }
        localStorage.setItem("session",JSON.stringify(newSession))
        return({message:res.data.message,status:res.status})
    }catch(err:any){
        console.log(err.response)
        return {message: err.response.data.message, status: err.response.status}
    }
}

const Register = async(data:{name:string,email:string,password:string}) => {
    try{
        await axios.post("/api/auth/register",data)
        alert("Account Created!")
        return await Login({email:data.email,password:data.password})
    }catch(err:any){
        console.log(err.response)
        return {message: err.response.data.message, status: err.response.status}
    }
}

export {
    SessionProvider,
    useSession,
    useRefreshAuth,
    Login,
    Register
}
