import { NextRequest } from "next/server";

const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams
    console.log(params)
    return Response.json({msg: "yee"},{status:200})
}

export {
    GET
}
