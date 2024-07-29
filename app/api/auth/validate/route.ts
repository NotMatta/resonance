import prisma from "@/prisma"
import { ValidateToken } from "@/utils/apiUtils"
const GET = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const User = await prisma.user.findUnique({where:{id:tokenData.data.userId}})
    if (!User){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    return Response.json({tokenData:{...tokenData,data:{...tokenData.data,userName:User.name,pfp:User.pfp}}},{status:202})
}

export {GET}
