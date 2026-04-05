import { Link } from "react-router-dom";
import Gomb from './Gomb';
import Urban_logo from '../assets/urbanRentalLogo.png'

export default function NavBar({user, onLogout}){
    const isLoggedIn=!!user
    //console.log(isLoggedIn);
    const isAdmin=user?.role==='admin'
    //console.log(isAdmin);
    return(
        <div className="container-fluid px-4">
            
            <div className="d-flex align-items-center justify-content-between py-3">
                <img src={Urban_logo} alt="logo" className="img img-fluid" style={{height:50, width:150}}></img>

                <div className="d-flex align-items-center gap-3">
                    <Link to='/' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black", background:"lightgray"}}>Avalable cars</Link>

                    {isLoggedIn?(
                        <>
                            <Link to='/myreservations' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black"}}>My reservations</Link>
                            
                            <Link to='/profile' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black"}}>Profile</Link>

                            {isAdmin&&<Link to='/admin' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black"}}>Admin panel</Link>}

                            <Gomb buttonClass='btn btn-dark px-4' content='Kijelentkezés' onClick={onLogout}/>
                        </>

                    ):(
                        <>
                            <Link to='/login' className="btn btn-dark px-4">Login</Link>
                        </>
                    )}

                </div>
            </div>

            <hr className="m-0" />

        </div>
    )
}