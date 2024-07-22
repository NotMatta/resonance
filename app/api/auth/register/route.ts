import prisma from "@/prisma"
import {hash} from "bcrypt"

const POST = async (req:Request) => {
    const {name,email,password} = await req.json()
    if(!email || !password || !name){
        return Response.json({message: "Bad ahh request"},{status:400})
    }
    try{
        const HashedPassword = await hash(password,12)
        await prisma.user.create({data:{name,email,password:HashedPassword}})
        return Response.json({message: "User Created"},{status:201})
    }
    catch(err: any){
        if(err.code && err.code == "P2002"){
            return Response.json({message: "Similar account with the same email exists"},{status:400})
        } else {
            return Response.json({},{status:500})
        }
    }
}

export {
    POST
}
