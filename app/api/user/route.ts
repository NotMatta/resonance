import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"

const PUT = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {name,pfp} = await req.json()
    console.log({name,pfp})
    if (!name && !pfp){
        return Response.json({message: "why?"},{status: 400})
    }
    const query = async () => {
        name ? await prisma.user.update({
            where:{
                email: tokenData.data.email
            },
            data:{
                name
            }
        }) : ""
        pfp ? await prisma.user.update({
            where:{
                email: tokenData.data.email
            },
            data:{
                pfp
            }
        }) : ""
        return {message: "Updated <3",status: 200}
    }
    return await handleQuery(query)
}

const DELETE = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const query = async () => {
        await prisma.user.delete({
            where:{
                email: tokenData.data.email
            }
        })
        return {message: "Byee and never come back <3",status: 200}
    }
    return await handleQuery(query)
}

export{
    PUT,
    DELETE
}
