"use client"

import { useSession } from "@/components/session-provider"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SettingsPage = () => { 
    const session = useSession()
    const [data,setData] = useState({name:"",pfp:""})
    const [authData,setAuthData] = useState({oldPassword:"",newPassword:""})
    const router = useRouter()

    const HandleUpdate = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.put("/api/user",data,{
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            })
            alert(res.data.message)
            router.push("/main/home")
        }catch(err:any){
            alert(err.response.data.message)
        }
    }   
    const HandlePasswordUpdate = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.put("/api/auth",authData,{
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            })
            alert(res.data.message)
            router.push("/main/home")
        }catch(err:any){
            alert(err.response.data.message)
        }
    }   

    return (
            <div className="w-full h-full flex flex-col items-center md:block">
            <h1>Settings</h1>
            <div className="w-full flex gap-2 flex-col-reverse md:flex-row">
                <div className="w-full md:w-1/2">
                    <form className="w-full" onSubmit={HandleUpdate}>
                        <h3>Username</h3>
                        <input value={data.name} onChange={(e) => setData({...data,name:e.target.value})} placeholder={session.name}/>
                        <h3>Profile Picture</h3>
                        <input value={data.pfp} onChange={(e) => setData({...data,pfp:e.target.value})} placeholder={"Image URL.."}/>
                        <div className="flex w-full justify-end gap-2 my-4">
                            <button className="outlined" onClick={() => setData({name:"",pfp:""})}>Reset</button>
                            <button className="default" disabled={data.name == "" && data.pfp == ""} type="submit">Save</button>
                        </div>
                    </form>
                        <form className="w-full space-y-2" onSubmit={HandlePasswordUpdate}>
                        <h3>Change Password:</h3>
                        <input value={authData.oldPassword} onChange={(e) => setAuthData({...authData,oldPassword:e.target.value})} placeholder={"Old Password.."}/> <br/>
                        <input value={authData.newPassword} onChange={(e) => setAuthData({...authData,newPassword:e.target.value})} placeholder={"new Password.."}/><br/>
                        <button className="default" type="submit" disabled={authData.oldPassword == "" || authData.newPassword == ""}>Chnage Password</button>
                    </form>
                </div>
                    <div className="border w-full md:w-1/2 box-border p-2 flex gap-2 h-fit">
                    <img className="size-24 rounded-full object-cover" src={data.pfp != "" ? data.pfp : session.pfp}/>
                    <div className="flex flex-col justify-center">
                        <p className="font-bold">{data.name != "" ? data.name : session.name}</p>
                        <p className="text-secondary">{session.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
