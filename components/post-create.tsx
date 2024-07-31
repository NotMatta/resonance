"use client"
import { useState , useContext } from "react"
import { useSession } from "./session-provider"
import { Send } from "lucide-react"
import { RedirectorContext } from "./redirector-provider"
import axios from "axios"

const PostCreate = () => {

    const session = useSession()
    const {setLoading} : any = useContext(RedirectorContext)
    const [postText,setPostText] = useState("")
    
    const HandlePost = async () => {
        setLoading(true)
        try{
            await axios.post("/api/post/",{text:postText},{headers:{Authorization:`Bearer ${session.token}`}})
            alert("Post Created!")
        }catch(err){
            console.log(err)
            alert("something went wrong")
        }
        setPostText("")
        setLoading(false)
    }

    return (
        <div className="w-full border rounded-xl flex items-center focus-within:items-start gap-2 box-border p-2 h-16 focus-within:h-fit overflow-hidden max-h-52">
            <img src={session.pfp} className="size-12 rounded-full object-cover" />
            <textarea className="w-full bg-background border-none rounded-none focus-visible:outline-none min-h-full max-h-full"
                placeholder="What's on your mind~"
                value={postText}
                onChange={(e) => {
                    setPostText(e.target.value)
                }}
                />
            <button className="default" onClick={HandlePost}><Send/></button>
        </div>
    )
}

export default PostCreate
