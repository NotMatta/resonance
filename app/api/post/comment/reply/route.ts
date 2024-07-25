import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"

const POST = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {text,commentId} = await req.json()
    if (!text || text == "" || isNaN(commentId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        await prisma.reply.create({data:{
            authorId: tokenData.data.userId,
            commentId: Number(commentId),
            text
        }})
        return {message: "Reply Created", status: "201"}
    }
    return await handleQuery(query)
}

const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {replyId} = await req.json()
    if (!replyId || isNaN(replyId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const reply = await prisma.reply.findUnique({where:{
            id: Number(replyId)
        }})
        if (!reply){
            return {message: "eh?", status: "404"}
        }
        if (reply.authorId != tokenData.data.userId){
            return {message: "Not yours dumpass", status: "403"}
        }
        await prisma.reply.delete({where:{id: reply.id}})
        return {message: "Shame deleted", status: "201"}
    }
    return await handleQuery(query)
}
export {
    POST,
    PUT
}
