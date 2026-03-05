import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../pics/urbanRentalLogo.png';
import Register from "./Register";
import NavBar from "../components/NavBar";
export default function HomePage() {
    const navigate=useNavigate()
    const [user, setUser] = useState(null)
    const [userError,setUserError]=useState(null)
    useEffect(()=>{
        async function load(){
            const data= await whoAmI()
            //console.log(data);
            if(!data?.error){
                setUser(data)
            }
            return setUserError(data.error)
        }
        load()
    },[])

    async function onLogout(){
        const data=await logout()
        if(data.error){
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }

    return (
        <div>
            <NavBar user={user} onLogout={onLogout}></NavBar>
            {userError && <div className="alert alert-danger text-center my-2">{userError}</div>}
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 id="homePageHI">Welcome home! :D</h1>
            </div>
        </div>
    );
}

