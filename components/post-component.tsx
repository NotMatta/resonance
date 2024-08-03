"use client"
import { Heart, Reply } from "lucide-react";
import { useSession } from "./session-provider";
import { useEffect, useState, useContext } from "react";
import { RedirectorContext, useGlobalLoad } from "./redirector-provider";
import axios from "axios";
import { useRouter } from "next/navigation";

const Post = ({postData,isPage}:any) => {

    const session = useSession()
    const [liked,setLiked] = useState(false)
    const [likeCount,setLikeCount] = useState(postData.likesCount)
    const [load,setLoading] = useState(true)
    const router = useRouter()
    const setGlobalLoading = useGlobalLoad()

    const getTimeDifferenceString = (createdAt:string) => {
        const now: any = new Date();
        const then: any = new Date(createdAt)
        const diffInMs = now - then;

        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `created ${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `created ${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `created ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (seconds > 0) {
            return `created ${seconds} second${seconds > 1 ? 's' : ''} ago`;
        } else {
            return 'just been created';
        }
    }
    const TriggerLike = async() => {
        if(liked){
            try{
                await axios.delete("/api/post/like",{
                    headers:{
                        Authorization: `Bearer ${session.token}`
                    },
                    params:{
                        postId: postData.id
                    }
                })
                setLiked(false)
                setLikeCount(likeCount - 1)
            }catch(err){
                console.log(err)
                alert("something happened")
            }
        } else {
            try{
                await axios.post("/api/post/like",{postId: postData.id},{headers:{Authorization: `Bearer ${session.token}`}})
                setLiked(true)
                setLikeCount(likeCount + 1)
            }catch(err){
                console.log(err)
                alert("something happened")
            }
        }
    }

    useEffect(() => {
        const FetchLike = async () => {
            try{
                await axios.get("/api/post/like",{
                    headers:{
                        Authorization: `Bearer ${session.token}`
                    },
                    params:{
                        postId: postData.id
                    }
                })
                setLiked(true)
            }catch(err){
                setLiked(false)
            }
        }
        if(load){
            setGlobalLoading(true)
            FetchLike()
            setLoading(false)
            setGlobalLoading(false)
        }
    },[load,setLoading,session,postData,setGlobalLoading])


    return(
        <div className={`border w-full rounded-xl p-2 box-border flex flex-col gap-2 duration-200 ${!isPage? "hover:scale-[1.01]":""}`}>
            <div className="flex gap-2 items-start" onClick={() => {!isPage ? router.push(`/main/post/${postData.id}`) : "" }}>
                <img src={postData.authorPfp} className="rounded-full object-cover size-12"/>
                <div className="flex flex-col justify-start h-full">
                    <h3 className="">{postData.authorName}</h3>
                    <p className="text-sm">{getTimeDifferenceString(postData.creationDate)}</p>
                </div>
            </div>
            <div onClick={() => {!isPage ? router.push(`/main/post/${postData.id}`) : "" }}>
                <p className="max-w-full">{postData.text}</p>
            </div>
            <div className="border-t pt-2 flex gap-2 items-center">
                <button onClick={TriggerLike} className={`hover:bg-primary hover:text-background duration-200 flex gap-2 items-center p-2 ${liked? "text-background bg-primary": ""}`}><Heart className="size-6"/><p>{likeCount}</p></button>
                <button className={`hover:bg-primary hover:text-background duration-200 flex gap-2 items-center p-2 ${isPage ? "hidden" : ""}`}><Reply className="size-6"/>Comment</button>
            </div>
        </div>
    )
}

export default Post
