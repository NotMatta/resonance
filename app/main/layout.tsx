import NavBar from "@/components/navbar"

const Layout = ({children}: {children:React.ReactNode}) => {
    return (
        <div className="flex flex-col-reverse h-full md:flex-row">
            <NavBar/>
            <div className="p-2 h-full w-full">
                {children}
            </div>
        </div>
    )
}

export default Layout
