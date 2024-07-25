const Layout = ({children}: {children: React.ReactNode}) => {
    return( 
        <div className="flex w-full h-full p-4 box-border justify-center items-center">
            {children}
        </div>
    )
}

export default Layout
