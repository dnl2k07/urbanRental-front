import { Link } from "react-router-dom";
import logo from '../pics/urbanRentalLogo.png';

export default function Navbar({ user, onLogout }) {
    const isLoggedIn = !!user
    const isAdmin = user?.role === 'admin'
    return (

        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-4 d-flex align-items-center">

                    <Link to="/">
                        <img src={logo} className="logo" alt="URLogo" width={250} />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="ms-auto d-flex align-items-center gap-3">

                        {isLoggedIn ? (
                            <>
                                <Link to='/reservation' className="px-3 py-1 text-decoration-none" style={{ fontSize: 24, color: "black" }}>My rentals</Link>
                                <Link to='/profile' className="px-3 py-1 text-decoration-none" style={{ fontSize: 24, color: "black" }}>My Profile</Link>

                                {isAdmin && (
                                    <Link to='/admin' className="px-3 py-1 text-decoration-none" style={{ fontSize: 24, color: "black" }}>
                                        Admin panel
                                    </Link>
                                )}
                                <Link to='/logout' className="px-3 py-1 text-decoration-none logoutBtn" onClick={onLogout} style={{ fontSize: 24, color: "black" }}>Logout</Link>

                            </>
                        ) : (
                            <Link className="nav-link fw-bold" to="/login">Login</Link>
                        )}

                    </div>

                </div>
            </nav>
        </>
    )
}