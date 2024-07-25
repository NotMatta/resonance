"use client"
import { useState, useEffect, createContext, useContext } from "react";
import { checkStorage } from "@/utils/clientUtils";
import axios, { AxiosError } from "axios";

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

const SessionContext = createContext({session:Husk})

const SessionProvider = ({children} : {children: React.ReactNode}) => {
    const [session,setSession] = useState<sessionType>(Husk)
    const [Load,setLoading] = useState(true)
    
    useEffect(() => {
        if (Load){
            setSession({...Husk,status:"loading"})
            checkStorage().then((res : sessionType) => {
                setSession(res)
            })
            setLoading(false)
        }
    },[Load,setLoading])

    return (
        <SessionContext.Provider value={{session}}>
        {children}
        </SessionContext.Provider>
    )
}

const useSession = () => {
    const {session} = useContext(SessionContext)
    return session
}

const Login = async(data: {email:string,password:string}) => {
    try{
        const res = await axios.post("/api/auth/login",data)
        return({message:res.data.message,status:res.status})
    }catch(err:any){
        console.log(err.response)
        return {message: err.response.data.message, status: err.response.status}
    }
}

export {
    SessionProvider,
    useSession,
    Login
}
