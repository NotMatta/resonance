"use client"

import { useState, useEffect, useContext } from "react"
import { useGlobalLoad } from "@/components/redirector-provider"
import { useSession } from "@/components/session-provider"
import axios from "axios"
import Post from "@/components/post-component"

const PostPage = ({params}:{params:{postId: string}}) => {

    const [postData,setPostData] = useState()
    const session = useSession()
    const setGlobalLoad = useGlobalLoad()
    const [load,setLoading] = useState(true)

    useEffect(() => {
        const FetchPost = async () => {
            try{
                const res = await axios.get("/api/post",{
                    headers:{
                        Authorization: `Bearer ${session.token}`
                    },
                    params:{
                        method: "postId",
                        id: params.postId
                }})
                setPostData(res.data.Post)
            }catch(err:any){
                console.log(err.response)
                err.response.status == 404? (() => {
                    alert("No post was found")

                })() : alert("something hppened")
            }
        }
        if (load && session.status == "authenticated"){
            setGlobalLoad(true)
            FetchPost()
            setLoading(false)
            setGlobalLoad(false)
        }
    },[load,setLoading,setGlobalLoad,session,params])

    return(
        <div className="w-full max-w-4xl mx-auto">
            {postData && <Post postData={postData} isPage={true}/>}
        </div>
    )
}

export default PostPage
