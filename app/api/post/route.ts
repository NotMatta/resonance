import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"
import { NextRequest } from "next/server"

const GET = async (req:NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const params = req.nextUrl.searchParams
    const {method,id} = {method:(params.get("method") || ""),id:Number(params.get("id") || undefined)}
    if(["userId","postId"].indexOf(method) == -1 || isNaN(id)){
        return Response.json({message: "bad request"},{status: 400})
    }
    const query = async() => {
        if(method == "userId") {
            const Posts = await prisma.post.findMany({where:{authorId:id},take:10})
            return {Posts,status:(Posts.length == 0 ? 404 : 200)}
        }
        const Post = await prisma.post.findUnique({where:{id}})
        return {Post,status:200}
    }
    return handleQuery(query)
}

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


const DELETE = async (req:NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const postId = Number(req.nextUrl.searchParams.get("postId") || undefined)
    if (isNaN(postId)){
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
        return {message: "Shame deleted", status: "200"}
    }
    return await handleQuery(query)
}



export {
    GET,
    POST,
    DELETE
}
