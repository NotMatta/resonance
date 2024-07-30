"use client"
import { RedirectorContext } from "@/components/redirector-provider"
import { useSession } from "@/components/session-provider"
import axios from "axios"
import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const ProfilePage = ({params}: {params: {id: string}}) => {

    const session = useSession()
    const [load,setLoad] = useState(true)
    const [userInfo,setUserInfo] = useState({})
    const setRedirector = useContext(RedirectorContext).setLoading
    const router = useRouter()

    useEffect(() => {
        const FetchUser = async () => {
            try{
                const res = await axios.get("/api/user/",{
                    headers:{
                        Authorization: `Bearer ${session.token}`
                    },
                    params:{
                        type: "u",
                        id: params.id
                    }
                })
                setUserInfo(res.data.User)
            }catch(err:any){
                console.log(err.response)
                err.response.status == 404 ? alert("user doesn't exist"): alert("Unknown error")
                router.push("/main/home")
            }
        }
        if (load && session.status == "authenticated"){
            FetchUser()
            setLoad(false)
            setRedirector(false)
        }
    },[load,setLoad,router,setUserInfo,params,session,setRedirector])

    return (
        <div className="w-full max-w-4xl h-full mx-auto">
            <div className="flex items-center gap-2 rounded-xl hover:bg-primary hover:text-background w-fit p-1 cursor-pointer text-sm underline" onClick={() => history.back()}>
                <MoveLeft/>
                <p>Go Back</p>
            </div>
            {!load && <div className="w-full h-32 md:h-36 border-b flex items-end mb-16">
                <div className="translate-y-1/2 flex gap-2">
                    <img src={userInfo?.pfp} className="rounded-full size-28 object-cover"/>
                    <div className="flex flex-col justify-between gap-1">
                        <div className="h-1/2">
                            <p className="font-bold">{userInfo?.name}</p>
                            <p className="text-xs">{userInfo?.email}</p>
                        </div>
                        <div className="h-1/2">
                            <p className="text-sm font-semibold">Followers: 0</p>
                            <p className="text-sm font-semibold">Following: 0</p>
                        </div>
                    </div>
                </div>
            </div>}
            <h3>Posts</h3>
        </div>
    )
}

export default ProfilePage
