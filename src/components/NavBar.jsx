import { Link, useNavigate } from "react-router-dom";
import Gomb from './Gomb';
import Urban_logo from '../assets/urbanRentalLogo.png'
import defaultAvatarPhoto from '../assets/default-avatar-photo.jpg';

// Default profile picture as inline SVG
const DEFAULT_PROFILE_PIC = defaultAvatarPhoto;

export default function NavBar({user, onLogout}){
    const isLoggedIn=!!user
    //console.log(isLoggedIn);
    const isAdmin=user?.role==='admin'
    //console.log(isAdmin);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return(
        <div className="container-fluid px-4">
            
            <div className="d-flex align-items-center justify-content-between py-3">
                <img 
                    src={Urban_logo} 
                    alt="logo" 
                    className="img img-fluid" 
                    style={{height:50, width:150, cursor:"pointer", transition:"transform 0.2s ease"}}
                    onClick={handleLogoClick}
                ></img>

                <div className="d-flex align-items-center gap-3">
                    <Link to='/' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black", background:"lightgray"}}>Avalable cars</Link>

                    {isLoggedIn?(
                        <>
                            <Link to='/myreservations' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black"}}>My reservations</Link>
                            
                            <div className="d-flex align-items-center gap-2">
                                <Link to='/profile' className="text-decoration-none" style={{fontSize:24,color:"black"}}>
                                    Profile
                                    <img 
                                        src={user?.img || DEFAULT_PROFILE_PIC} 
                                        alt="User profile" 
                                        className="rounded-circle" 
                                        style={{
                                            width: 35, 
                                            height: 35, 
                                            objectFit: 'cover',
                                            border: '2px solid #007bff',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Link>
                            </div>

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
