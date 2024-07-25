import { ValidateToken } from "@/utils/apiUtils"
const GET = async (req:Request) => {
    const tokenData : any = ValidateToken(req)
    if (!tokenData){
        return Response.json({message: "who tf are you"},{status: 403})
    }
    return Response.json({tokenData},{status:202})
}

export {GET}
