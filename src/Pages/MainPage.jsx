import Navbar from "../components/NavBar"
import { useState,useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
export default function Home() {
const navigate = useNavigate

    const [user, setUser] = useState(null)
    const [userError,setUserError]=useState(null)

    useEffect(()=>{
        async function load(){
            const data= await whoAmI()
            console.log(data);
            if(!data.error){
                setUser(data)
            }
            setUserError(data.error)
        }
        load()
    },[])

    async function failedLogin(){
        const data = await logout()
        if (data.error === "nincs cookie") {
            setUserError("Nincs aktív bejelentkezés!")
        }
    }

    async function onLogout(){
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        failedLogin()
        navigate('/')

    }
    

    return(
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout}></Navbar>

            {userError && true && <div className="alert alert-danger text-center my-2 w-25 h-25 m-5" >{userError}</div>}
        </div>
    )
}