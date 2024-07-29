import { CircleUserRound, House, Rss, Settings } from "lucide-react"

const NavBar = () => {
    return (
        <div className="*:NavBarIcon border-t h-16 md:w-20 md:h-auto md:border-t-0 md:border-r top-0 left-0 box-border flex md:flex-col justify-around md:justify-center md:gap-10 items-center">
            <a><House/></a>
            <a><Rss/></a>
            <a><CircleUserRound/></a>
            <a><Settings/></a>
        </div>
    )
}

export default NavBar
