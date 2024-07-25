"use client"
import { RedirectorContext } from "@/components/redirector-provider"
import { Register, useRefreshAuth } from "@/components/session-provider"
import Link from "next/link"
import { useContext, useState } from "react"
import { FormEvent } from "react"

const RegisterPage = () => {

    const [data,setData] = useState<{name:string,email:string,password:string,cpassword:string}>({name: "", email:"",password:"",cpassword:""})
    const refresh = useRefreshAuth()
    const {setLoading} : any = useContext(RedirectorContext)

    const HandleRegister = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const {message,status} = await Register({name:data.name,email:data.email,password:data.password})
        if (status != 202){
            setData({name: "", email:"",password:"",cpassword:""})
            alert(message)
            setLoading(false)
            return
        } //@ts-ignore
        refresh(true)
        setLoading(false)
        return
    }

    return (
        <form className="border max-w-96 w-full rounded-xl px-4 py-2 space-y-3" onSubmit={HandleRegister}>
            <h2 className="w-full text-center">REGISTER</h2>
            <input className="w-full" placeholder="Username here.." type="text" value={data.name} onChange={(e) => {setData({...data,name:e.target.value})}}/>
            <input className="w-full" placeholder="Email here.." type="text" value={data.email} onChange={(e) => {setData({...data,email:e.target.value})}}/>
            <input className="w-full" placeholder="Password here.." type="password" value={data.password} onChange={(e) => {setData({...data,password:e.target.value})}}/>
            <input className="w-full" placeholder="Confirm Password here.." type="password" value={data.cpassword} onChange={(e) => {setData({...data,cpassword:e.target.value})}}/>
            <button className="default w-full" type="submit">Sign up</button>
            <Link className="w-full underline" href="/auth/login"><p className="w-full text-center p-2">Got an account?</p></Link>
        </form>
    )
}

export default RegisterPage
