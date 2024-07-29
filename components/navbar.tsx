import { CircleUserRound, House, Rss, Settings } from "lucide-react"
import Link from "next/link"

const NavBar = () => {
    return (
        <div className="*:NavBarIcon border-t h-16 md:w-20 md:h-auto md:border-t-0 md:border-r top-0 left-0 box-border flex md:flex-col justify-around md:justify-center md:gap-10 items-center">
            <Link href="/main/home"><House/></Link>
            <a><Rss/></a>
            <Link href="/main/profile"><CircleUserRound/></Link>
            <Link href="/main/settings"><Settings/></Link>
        </div>
    )
}

export default NavBar
