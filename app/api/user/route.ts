import prisma from "@/prisma"
import { ValidateToken } from "@/utils/apiUtils"

const PUT = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {userName} = await req.json()
    if (!userName){
        return Response.json({message: "why?"},{status: 400})
    }
    try{
        await prisma.user.update({
            where:{
                email: tokenData.data.email
            },
            data:{
                name:userName
            }
        })
        return Response.json({message: "Updated <3"},{status: 200})
    }catch(err:any){
        if(err.code && err.code == 'P2025'){
            return Response.json({message: (err.meta.cause + " and how tf")},{status: 400})
        }
        return Response.json({message:err},{status: 500})
    }
}

const DELETE = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    try{
        await prisma.user.delete({
            where:{
                email: tokenData.data.email
            }
        })
        return Response.json({message: "Byee and never come back <3"},{status: 200})
    }catch(err:any){
        if(err.code && err.code == 'P2025'){
            return Response.json({message: (err.meta.cause + " and how tf")},{status: 400})
        }
        return Response.json({message:err},{status: 500})
    }
    
}

export{
    PUT,
    DELETE
}
