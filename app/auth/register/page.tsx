import Link from "next/link"

const RegisterPage = () => {
    return (
        <form className="border max-w-96 w-full rounded-xl px-4 py-2 space-y-3">
            <h2 className="w-full text-center">REGISTER</h2>
            <input className="w-full" placeholder="Username here.." type="text"/>
            <input className="w-full" placeholder="Email here.." type="email"/>
            <input className="w-full" placeholder="Password here.." type="password"/>
            <input className="w-full" placeholder="Confirm Password here.." type="password"/>
            <button className="default w-full">Sign up</button>
            <Link className="w-full underline" href="/auth/login"><p className="w-full text-center p-2">Got an account?</p></Link>
        </form>
    )
}

export default RegisterPage
