import prisma from "@/prisma"
import { handleQuery, ValidateToken } from "@/utils/apiUtils"
import { NextRequest } from "next/server"

const UpdateUserCount = async (userId:number) => {
    const followerCount = await prisma.follow.count({where:{followingId:userId}})
    const followingCount = await prisma.follow.count({where:{followerId:userId}})
    await prisma.user.update({
        data:{
            followerCount,
            followingCount
        },
        where:{
            id: userId
        }
    })
}

const GET = async (req:NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const targetUserId = Number(req.nextUrl.searchParams.get("targetUserId"))
    if (!targetUserId || isNaN(targetUserId)){
        return Response.json({message: "why?"},{status: 400})
    }
    if(targetUserId == tokenData.data.userId){
        return Response.json({message: "Narcissit"},{status: 406})
    }
    const query = async () => {
        const follow = await prisma.follow.findFirst({where: {
            followerId: tokenData.data.userId,
            followingId: targetUserId
        }})
        return follow ? {message:"",status: 200} : {message:"",status:404}
    }
    return await handleQuery(query)
}

const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {targetUserId} = await req.json()
    if (!targetUserId || isNaN(targetUserId) || targetUserId == tokenData.data.userId){
        return Response.json({message: "why?"},{status: 400})
    }
    if(targetUserId == tokenData.data.userId){
        return Response.json({message: "Narcissit"},{status: 406})
    }
    const query = async () => {
        await prisma.follow.create({data:{
            followerId: tokenData.data.userId,
            followingId: Number(targetUserId)    
        }})
        await UpdateUserCount(tokenData.data.userId)
        await UpdateUserCount(Number(targetUserId))
        return {message:"Done!",status:201}
    }
    return await handleQuery(query)
}

const DELETE = async (req:NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const targetUserId = Number(req.nextUrl.searchParams.get("targetUserId"))
    if (!targetUserId || isNaN(targetUserId)){
        return Response.json({message: "why?"},{status: 400})
    }
    if(targetUserId == tokenData.data.userId){
        return Response.json({message: "Narcissit"},{status: 406})
    }
    const query = async () => {
        const res = await prisma.follow.findFirst({where:{
            followerId: tokenData.data.userId,
            followingId: targetUserId   
        }})
        if(!res){
            return {message:"Who again?",status:404}
        }
        await prisma.follow.delete({where:{id:res.id}})
        await UpdateUserCount(tokenData.data.userId)
        await UpdateUserCount(targetUserId)
        return {message:"Friendship ended <3",status:201}
    }
    return await handleQuery(query)
}

export {
    GET,
    PUT,
    DELETE
}
