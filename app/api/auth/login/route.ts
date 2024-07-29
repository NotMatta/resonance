import prisma from "@/prisma"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

const POST = async (req:Request) => {
    const {email,password} = await req.json()
    if(!email || !password){
        return Response.json({message: "Bad ahh request"},{status:400})
    }
    try{
        const FoundUser = await prisma.user.findUnique({
            where:{email}
        })
        if (FoundUser){
            const valid = await compare(password,FoundUser.password)
            if (valid){
                const secret = process.env.JWT_SECRET || "sah"
                const token = sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    data:{
                        userId: FoundUser.id,
                        email: FoundUser.email,
                        userName: FoundUser.name,
                        pfp: FoundUser.pfp
                    }},secret)
                return Response.json({message: "Go on sir",token,name:FoundUser.name,email:FoundUser.email,userId:FoundUser.id,pfp:FoundUser.pfp},{status:202})
            } else {
                return Response.json({message: "Who tf are you"},{status:403})
            }
        } else {
            return Response.json({message: "User Not found"},{status:403})
        }
    }catch(err){
        return Response.json({message: "Internal server error or something"},{status:500})
    }
}

export { POST }
