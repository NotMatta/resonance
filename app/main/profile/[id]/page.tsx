"use client"
import { RedirectorContext } from "@/components/redirector-provider"
import { useSession } from "@/components/session-provider"
import axios from "axios"
import { MoveLeft, Pen } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"

const ProfilePage = ({params}: {params: {id: string}}) => {

    const session = useSession()
    const [load,setLoad] = useState(true)
    const [userInfo,setUserInfo] = useState({})
    const [following,setFollow] = useState(false)
    const [owner,setOwner] = useState(false)
    const setRedirector = useContext(RedirectorContext).setLoading
    const router = useRouter()

    const triggerFollow = async () => {
        setRedirector(true)
        try{
            await axios.put("/api/user/follow",{
                targetUserId: params.id
            },{
                headers:{
                    Authorization: `Bearer ${session.token}`
                },
            })
            alert("Followed!")
        }catch(err:any){
            console.log(err.response)
            alert("something happened!")
        }
        setLoad(true)
    }
    const triggerUnfollow = async () => {
        setRedirector(true)
        try{
            await axios.delete("/api/user/follow",{
                params:{targetUserId: params.id},
                headers:{
                    Authorization: `Bearer ${session.token}`
                },
            })
            alert("Friendship ended!")
        }catch(err:any){
            console.log(err.response)
            alert("something happened!")
        }
        setLoad(true)
    }

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
        const FetchFollow = async () => {
            try{
                const res = await axios.get("/api/user/follow",{
                    headers:{
                        Authorization: `Bearer ${session.token}`
                    },
                    params:{
                        targetUserId: params.id
                    }
                })
                setFollow(true)
            }catch(err:any){
                err.response.status == 404 ? setFollow(false):
                    err.response.status == 406? setOwner(true) : ""
            }
        }
        if (load && session.status == "authenticated"){
            setRedirector(true)
            FetchUser()
            FetchFollow()
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
            {!load && <div className="w-full h-32 md:h-36 border-b flex items-end mb-16 relative">
                <div className="translate-y-1/2 flex gap-2">
                    <img src={userInfo?.pfp} className="rounded-full size-28 object-cover"/>
                    <div className="flex flex-col justify-between gap-1">
                        <div className="h-1/2">
                            <p className="font-bold">{userInfo?.name}</p>
                            <p className="text-xs">{userInfo?.email}</p>
                        </div>
                        <div className="h-1/2">
                            <p className="text-sm font-semibold">Followers: {userInfo?.followerCount}</p>
                            <p className="text-sm font-semibold">Following: {userInfo?.followingCount}</p>
                        </div>
                    </div>
                </div>
                {!owner && <div className="absolute right-0 box-border p-2">
                        {!following && <button className="default p-2 text-sm" onClick={triggerFollow}>
                                Follow
                            </button>}
                        {following && <button className="outlined p-2 text-sm" onClick={triggerUnfollow}>
                                unfollow
                            </button>}
                            
                    </div>}
                {owner && <Link href="/main/settings" className="absolute right-0 flex box-border p-2 items-center gap-2 border rounded-xl m-2">
                            <Pen className="size-4"/><p className="text-sm">Edit Profile</p>
                    </Link>}
            </div>}
            <h3>Posts</h3>
        </div>
    )
}

export default ProfilePage
