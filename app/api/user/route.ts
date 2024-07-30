import prisma from "@/prisma"
import { ValidateToken, handleQuery } from "@/utils/apiUtils"
import { NextRequest } from "next/server"

const GET = async (req: NextRequest) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const params = req.nextUrl.searchParams
    const type = params.get("type")
    if (!type){
        return Response.json({message: "why"},{status: 400})
    }
    const {id,key,page} = {id: Number(params.get("id")),key: (params.get("key") || ""),page: Number(params.get("page"))}
    if ((["m","u"].indexOf(type) == -1)  || (type == "u" && !id) || (type == "m" && !key && !page) || isNaN(id), isNaN(page)){
        return Response.json({message: "Bad request"},{status: 400})
    }
    if (type == "u"){
        try{
            const FoundUser = await prisma.user.findUnique({where:{id}})
            if (FoundUser){
                return Response.json({message: "nyega",User:{
                    id: FoundUser.id,
                    name: FoundUser.name,
                    email: FoundUser.email,
                    pfp: FoundUser.pfp,
                    followerCount: FoundUser.followerCount,
                    followingCount: FoundUser.followingCount
                }},{status: 200})}
            return Response.json({message: "No user found"},{status: 404})
        }catch(err){
            console.log(err)
            return Response.json({message: "smth happend"},{status: 500})
        }
    }
    try{
        const FoundUsers = await prisma.user.findMany({where:{name:{contains:key}},take:10,skip:(page*10)})
        const Users = FoundUsers.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                pfp: user.pfp,
                followerCount: user.followerCount,
                followingCount: user.followingCount
            }
        })
        if (Users.length != 0){
            return Response.json({message: "Found some users!",Users},{status: 200})
        }
        return Response.json({message: "No user found"},{status: 404})
    }catch(err){
        console.log(err)
        return Response.json({message: "smth happend"},{status: 500})
    }
}

const PUT = async (req: Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    const {name,pfp} = await req.json()
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
    GET,
    PUT,
    DELETE
}
