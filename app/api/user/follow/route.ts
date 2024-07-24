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
        await prisma.follow.create({data:{
            followerId: Number(tokenData.data.userId),
            followingId: Number(targetUserId)    
        }})
        return {message:"Done!",status:201}
    }
    return await handleQuery(query)
}

export {
    PUT
}
