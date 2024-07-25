import { ValidateToken, handleQuery } from "@/utils/apiUtils"
import prisma from "@/prisma"
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
        await prisma.postLikes.create({data:{
            postId: Number(postId),
            userId: tokenData.data.userId
        }})
        return {message: "Liked <3", status:"201"}
    }
    return await handleQuery(query)
} 

const PUT = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {postId} = await req.json()
    if (!postId || isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const reaction = await prisma.postLikes.findFirst({where:{
            postId: Number(postId),
            userId: tokenData.data.userId
        }})
        if(!reaction){
            return {message: "where?", status:"404"}
        }
        await prisma.postLikes.delete({where:{id:reaction.id}})
        return {message: "Kink hidden <3", status:"202"}
    }
    return await handleQuery(query)
} 
export {
    POST,
    PUT
}
