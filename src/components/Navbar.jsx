import { Link } from "react-router-dom";
import logo from '../pics/urbanRentalLogo.png';

export default function Navbar({ user, onLogout }) {
    const isLoggedIn = !!user
    const isAdmin = user?.role === 'admin'
    return (

        <>
            <nav className="navbar navbar-expand-lg px-2">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} className="logo" alt="URLogo" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navRes">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navRes">
                        <div className="ms-auto d-flex align-items-center gap-2">
                            {isLoggedIn ? (
                                <>
                                    <Link to='/myreservations' className="nav-link px-3" style={{ fontSize: 20, color: "black" }}>My rentals</Link>
                                    <Link to='/profile' className="nav-link px-3" style={{ fontSize: 20, color: "black" }}>My Profile</Link>
                                    {isAdmin && (
                                        <Link to='/admin' className="nav-link px-3" style={{ fontSize: 20, color: "black" }}>Admin panel</Link>
                                    )}
                                    <Link to='/logout' className="px-3 py-1 text-decoration-none logoutBtn ms-2" onClick={onLogout} style={{ fontSize: 20, color: "white" }}>Logout</Link>
                                </>
                            ) : (
                                <Link className="nav-link fw-bold" to="/login">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}