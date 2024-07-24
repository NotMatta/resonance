import { verify } from "jsonwebtoken"

const ValidateToken = (req:Request) => {
    const token = req.headers.get("Authorization")?.split(" ")[1]
    if(token){
        try{
            const secret = process.env.JWT_SECRET || "sah"
            const decoded = verify(token,secret)
            return decoded
        }catch(err){
            return null
        }
    }
}

export {
    ValidateToken
}
