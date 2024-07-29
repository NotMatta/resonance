import axios from "axios"

const checkStorage = async () => {
    const storedSession = localStorage.getItem("session")
    if(storedSession){
        try{
            const parsedSession = JSON.parse(storedSession)
            const res = await axios.get("/api/auth/validate",{
                headers:{
                    Authorization: ("Bearer " + parsedSession.token)
                }
            })
            if (res.status == 202){
                return {
                    userId: res.data.tokenData.data.userId,
                    name: res.data.tokenData.data.userName,
                    email: res.data.tokenData.data.email,
                    status: "authenticated",
                    token: parsedSession.token,
                    pfp: res.data.tokenData.data.pfp
                }
            }
            localStorage.removeItem("session")
        }catch(err:any){
            console.log(err.response)
        }
    }
    return {
        name: "",
        email: "",
        pfp: "",
        token: "",
        userId: null,
        status: "unauthenticated"
    }
}

export {checkStorage}
