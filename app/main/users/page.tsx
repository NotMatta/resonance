"use client"
import { RedirectorContext } from "@/components/redirector-provider"
import { useSession } from "@/components/session-provider"
import axios from "axios"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import {useContext, useState} from "react"

const UsersPage = () => {

    const [key,setKey] = useState("")
    const [Users,setUsers] = useState([])
    const session = useSession()
    const {setLoading} = useContext(RedirectorContext)
    const router = useRouter()

    const HandleSearch = async (e:any) => {
        e.preventDefault()
        try{
            const res = await axios.get("/api/user",{
                headers:{
                    Authorization: `Bearer ${session.token}`
                },
                params:{
                    type: "m",
                    key
                }
            })
            setUsers(res.data.Users)
            console.log(res)
        }catch(err:any){
            console.log(err.response)
            if (err.response.status == 404){
                alert(err.response.data.message)
            }
            setUsers([])
        }

    }

    return (
        <div className="flex flex-col items-center max-w-4xl min-h-full mx-auto gap-2 overflow-y-scroll">
            <h2>Connect with others!</h2>
            <form className="flex gap-1 w-full items-center" onSubmit={HandleSearch}>
                <input placeholder="Search for other users" className="w-full" value={key} onChange={(e)=>setKey(e.target.value)}/>
                <button className="default" type="submit">
                    <Search/>
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto w-full items-start gap-2 max-h-0">
                {Users.map((user:any) => 
                    <div key={user.id}
                         className="flex cursor-pointer gap-2 border hover:border-none rounded-xl bg-background p-2 box-border h-full w-full hover:text-background hover:bg-primary duration-200"
                         onClick={() => {
                            setLoading(true)
                            router.push(`/main/profile/${user.id}`)
                         }}
                         >
                        <img className="size-24 rounded-full object-cover" alt="pfp" src={user.pfp}/>
                        <div className="flex flex-col justify-center gap-2">
                            <p className="font-bold">{user.name}</p>
                            <p className="text-secondary text-sm">{user.email}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersPage
