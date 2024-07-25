"use client"
import { LoaderCircle } from "lucide-react"
import { useState, useEffect, useContext, createContext } from "react"

const RedirectorContext: any = createContext(undefined)

const RedirectorProvider = ({children}:{children:React.ReactNode}) => {
    
    const [Render,setRender] = useState(true)
    const [Loading,setLoading] = useState(true)

    useEffect(() => {
        if(Render){
            console.log("rerendered")
            setRender(false)
        }
    },[Render])

    return (
        <RedirectorContext.Provider value={{Render,setRender,Loading,setLoading}}>
            <div className={"w-full h-full absolute top-0 left-0 bg-background flex justify-center items-center duration-150 " +(Loading? "opacity-85" : "opacity-0 -z-30")} >
                <LoaderCircle size={64} className="animate-spin"/>
            </div>
            {children}
        </RedirectorContext.Provider>
    )
}

export {
    RedirectorProvider,
    RedirectorContext
}
