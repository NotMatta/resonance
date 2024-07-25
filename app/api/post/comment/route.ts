import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"

const POST = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {text,postId} = await req.json()
    if (!text || text == "" || isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        await prisma.comment.create({data:{
            authorId: tokenData.data.userId,
            postId: Number(postId),
            text
        }})
        return {message: "Comment Created", status: "201"}
    }
    return await handleQuery(query)
}

const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {commentId} = await req.json()
    if (!commentId || isNaN(commentId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const comment = await prisma.comment.findUnique({where:{
            id: Number(commentId)
        }})
        if (!comment){
            return {message: "eh?", status: "404"}
        }
        if (comment.authorId != tokenData.data.userId){
            return {message: "Not yours dumpass", status: "403"}
        }
        await prisma.comment.delete({where:{id: comment.id}})
        return {message: "Shame deleted", status: "201"}
    }
    return await handleQuery(query)
}
export {
    POST,
    PUT
}
