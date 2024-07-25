import Link from "next/link"

const LoginPage = () => {
    return (
        <form className="border max-w-96 w-full rounded-xl px-4 py-2 space-y-3">
            <h2 className="w-full text-center">LOGIN</h2>
            <input className="w-full" placeholder="Email here.." type="email"/>
            <input className="w-full" placeholder="Password here.." type="password"/>
            <button className="default w-full">Sign in</button>
            <Link className="w-full underline" href="/auth/register"><p className="w-full text-center p-2">No account?</p></Link>
        </form>
    )
}

export default LoginPage
