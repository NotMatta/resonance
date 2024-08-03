import { ValidateToken, handleQuery } from "@/utils/apiUtils"
import prisma from "@/prisma"
import { NextRequest } from "next/server"

const CountLikes = async (postId:number) => {
    const reactionCount = await prisma.postLike.count({where:{postId}})
    await prisma.post.update({where:{id:postId},data:{likesCount:reactionCount}})
}

const GET = async (req: NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const postId = Number(req.nextUrl.searchParams.get("postId") || undefined)
    if (isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const reaction = await prisma.postLike.findFirst({where:{
            postId: postId,
            userId: tokenData.data.userId
        }})
        if(!reaction){
            return {message: "", status:"404"}
        }
        return {message: "", status:"202"}
    }
    return await handleQuery(query)
}

const POST = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {postId} = await req.json()
    if (!postId || isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        await prisma.postLike.create({data:{
            postId: Number(postId),
            userId: tokenData.data.userId
        }})
        CountLikes(postId)
        return {message: "Liked <3", status:"201"}
    }
    return await handleQuery(query)
} 

const DELETE = async (req: NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const postId = Number(req.nextUrl.searchParams.get("postId") || undefined)
    if (isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const reaction = await prisma.postLike.findFirst({where:{
            postId: postId,
            userId: tokenData.data.userId
        }})
        if(!reaction){
            return {message: "where?", status:"404"}
        }
        await prisma.postLike.delete({where:{id:reaction.id}})
        CountLikes(postId)
        return {message: "Kink hidden <3", status:"202"}
    }
    return await handleQuery(query)
} 
export {
    GET,
    POST,
    DELETE
}
