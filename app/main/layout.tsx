"use client"
import NavBar from "@/components/navbar"
import { useSession } from "@/components/session-provider"

const Layout = ({children}: {children:React.ReactNode}) => {
    const session = useSession()
    return (
        <div className="flex flex-col-reverse h-full md:flex-row">
            <NavBar/>
            <div className="p-2 h-full max-h-full overflow-y-scroll w-full">
                {children}
            </div>
        </div>
    )
}

export default Layout
