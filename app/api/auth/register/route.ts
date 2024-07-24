import prisma from "@/prisma"
import {hash} from "bcrypt"

const POST = async (req:Request) => {
    const {name,email,password} = await req.json()
    if(!email || !password || !name){
        return Response.json({message: "Bad ahh request"},{status:400})
    }
    try{
        const HashedPassword = await hash(password,12)
        await prisma.user.create({data:{
            name,
            email,
            password:HashedPassword,
            pfp: "https://i.pinimg.com/750x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
        }})
        return Response.json({message: "User Created"},{status:201})
    }
    catch(err: any){
        if(err.code && err.code == "P2002"){
            return Response.json({message: "Similar account with the same email exists"},{status:400})
        }
        console.log(err)
        return Response.json({message:"something happened"},{status:500})
    }
}

export {
    POST
}
