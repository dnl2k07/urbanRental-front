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
        <nav className="navbar navbar-expand-lg site-nav">
            <div className="container-fluid px-4">
                <Link to='/' className="navbar-brand" onClick={handleLogoClick}>
                    <img 
                        src={Urban_logo} 
                        alt="logo" 
                        className="img img-fluid" 
                        style={{height:50, width:150, cursor:"pointer", transition:"transform 0.2s ease"}}
                    ></img>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link nav-link-custom">Available cars</Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to='/myreservations' className="nav-link nav-link-custom">My reservations</Link>
                                </li>
                                
                                <li className="nav-item dropdown">
                                    <Link to='/profile' className="nav-link nav-link-custom d-flex align-items-center gap-2" role="button">
                                        <img 
                                            src={user?.img || DEFAULT_PROFILE_PIC} 
                                            alt="User profile" 
                                            className="rounded-circle" 
                                            style={{
                                                width: 35, 
                                                height: 35, 
                                                objectFit: 'cover',
                                                border: '2px solid #0d6efd',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span>Profile</span>
                                    </Link>
                                </li>

                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link to='/admin' className="nav-link nav-link-custom">Admin panel</Link>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <Gomb buttonClass='btn btn-outline-danger px-4' content='Logout' onClick={onLogout}/>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to='/login' className="btn btn-primary px-4">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/register' className="btn btn-success px-4">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}