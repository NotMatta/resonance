import prisma from "@/prisma"
import { ValidateToken } from "@/utils/apiUtils"
import { compare,hash } from "bcrypt"

const PUT = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {newPassword,oldPassword} = await req.json()
    if (!newPassword || !oldPassword){
        return Response.json({message: "why?"},{status: 400})
    }
    if (newPassword == oldPassword){
        return Response.json({message: "They are the same"},{status: 400})
    }
    try{
        const FoundUser = await prisma.user.findUnique({where:{id: tokenData.data.userId}})
        if (!FoundUser){
            return Response.json({message: "who?"},{status: 404})
        }
        const valid = await compare(oldPassword,FoundUser.password)
        if(!valid){
            return Response.json({message: "sussy baka"},{status: 403})
        }
        const HashedPassword = await hash(newPassword,12)
        await prisma.user.update({where:{id:FoundUser.id},data:{
            password: HashedPassword
        }})
        return Response.json({message: "Don't forget!"},{status: 201})
        
    }catch(err){
        return Response.json({message: "Something happened"},{status: 500})
    }
}

export {PUT}
