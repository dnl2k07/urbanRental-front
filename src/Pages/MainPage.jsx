import Navbar from "../components/NavBar"
import { useState,useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
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
            <div className="container-fluid min-vh-100 pt-5 p-0" id="mainWindow">
                <div className="row g-0 h-100 align-items-center">
                    
                    <div className="col-md-4 px-5">
                        <h1 className="display-4">Hey, {user?.username || 'Tester'}!</h1>
                        <p className="lead">Welcome to Urban Rentals.</p>
                    </div>

                    <div className="col-md-8 p-0 d-flex justify-content-end">
                        <img 
                            src={backgroundPic} 
                            alt="Background picture" 
                            className="img-fluid"
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                objectFit: 'cover',
                                display: 'block' 
                            }}
                        />
                    </div>

                </div>
            </div>
            {userError && true && <div className="alert alert-danger text-center my-2 w-25 h-25 m-5" >{userError}</div>}
        </div>
    )
}