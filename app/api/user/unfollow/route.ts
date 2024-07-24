import prisma from "@/prisma"
import { handleQuery, ValidateToken } from "@/utils/apiUtils"

const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {targetUserId} = await req.json()
    if (!targetUserId || isNaN(targetUserId) || targetUserId == tokenData.data.userId){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        const res = await prisma.follow.findFirst({where:{
            followerId: Number(tokenData.data.userId),
            followingId: Number(targetUserId)    
        }})
        if(!res){
            return {message:"Who again?",status:404}
        }
        await prisma.follow.delete({where:{id:res.id}})
        return {message:"Friendship ended <3",status:201}
    }
    return await handleQuery(query)
}

export {
    PUT
}
