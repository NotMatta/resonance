import { CircleUserRound, House, Rss, Settings } from "lucide-react"
import Link from "next/link"
import { useSession } from "./session-provider"

const NavBar = () => {

    const session = useSession()

    return (
        <div className="*:NavBarIcon border-t h-16 flex-shrink-0 md:w-20 md:h-auto md:border-t-0 md:border-r top-0 left-0 box-border flex md:flex-col justify-around md:justify-center md:gap-10 items-center">
            <Link href="/main/home"><House/></Link>
            <Link href="/main/users"><Rss/></Link>
            <Link href={`/main/profile/${session.userId}`}><CircleUserRound/></Link>
            <Link href="/main/settings"><Settings/></Link>
        </div>
    )
}

export default NavBar
