import { verify } from "jsonwebtoken"

const ValidateToken = (req:Request) => {
    const token = req.headers.get("Authorization")?.split(" ")[1]
    if(token){
        try{
            const secret = process.env.JWT_SECRET
            if(!secret){
                return null
            }
            const decoded = verify(token,secret)
            return decoded
        }catch(err){
            return null
        }
    }
}

const handleQuery = async (query : any) => {
    try{
        const res = await query()
        return Response.json({...res},{status:res.status})
    }catch(err:any){
        console.log(err)
        if(err.code){
            return Response.json({message: ("Database issue ~")},{status: 409})
        }
        return Response.json({message:"something happned"},{status: 500})
    }
}

export {
    ValidateToken,
    handleQuery
}
