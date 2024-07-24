import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"

const POST = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {text} = await req.json()
    if (!text || text == ""){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        await prisma.post.create({data:{
            authorId: tokenData.data.userId,
            text
        }})
        return {message: "Post Created", status: "201"}
    }
    return await handleQuery(query)
}


const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {postId} = await req.json()
    if (!postId || isNaN(postId)){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const post = await prisma.post.findUnique({where:{
            id: Number(postId)
        }})
        if (!post){
            return {message: "eh?", status: "404"}
        }
        if (post.authorId != tokenData.data.userId){
            return {message: "Not yours dumpass", status: "403"}
        }
        await prisma.post.delete({where:{id: post.id}})
        return {message: "Shame deleted", status: "201"}
    }
    return await handleQuery(query)
}



export {
    POST,
    PUT
}
