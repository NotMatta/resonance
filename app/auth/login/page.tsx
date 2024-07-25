"use client"
import { RedirectorContext } from "@/components/redirector-provider"
import { Login, useRefreshAuth } from "@/components/session-provider"
import Link from "next/link"
import { useContext, useState } from "react"
import { FormEvent } from "react"

const LoginPage = () => {

    const [data,setData] = useState<{email:string,password:string}>({email:"",password:""})
    const refresh = useRefreshAuth()
    const {setLoading} : any = useContext(RedirectorContext)

    const HandleLogin = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const {message,status} = await Login(data)
        if (status != 202){
            setData({email:"",password:""})
            alert(message)
            setLoading(false)
            return
        } //@ts-ignore
        refresh(true)
        setLoading(false)
        return
    }

    return (
        <form className="border max-w-96 w-full rounded-xl px-4 py-2 space-y-3" onSubmit={HandleLogin}>
            <h2 className="w-full text-center">LOGIN</h2>
            <input className="w-full" placeholder="Email here.." type="text" value={data.email} onChange={(e) => {setData({...data,email:e.target.value})}}/>
            <input className="w-full" placeholder="Password here.." type="password" value={data.password} onChange={(e) => {setData({...data,password:e.target.value})}}/>
            <button className="default w-full" type="submit">Sign in</button>
            <Link className="w-full underline" href="/auth/register"><p className="w-full text-center p-2">No account?</p></Link>
        </form>
    )
}

export default LoginPage
