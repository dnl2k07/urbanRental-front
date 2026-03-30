import { Link } from "react-router-dom";
import logo from '../pics/urbanRentalLogo.png';
import { useState, useEffect } from 'react';

export default function Navbar({ user, onLogout }) {
    const [isVisible, setIsVisible] = useState(false);
    
    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const isLoggedIn = !!user
    const isAdmin = user?.role === 'admin'
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${isVisible ? 'animate-fade-in' : ''}`}>
                <div className="container-fluid px-4 d-flex align-items-center">
                    <Link to="/" className="d-inline-block animate-slide-in">
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
                    <div className={`ms-auto d-flex align-items-center gap-3 ${isVisible ? 'animate-fade-in-right' : ''}`}>
                        {isLoggedIn ? (
                            <>
                                <Link to='/reservation' className="px-3 py-1 text-decoration-none nav-link-hover" style={{ fontSize: 24, color: "black" }}>My rentals</Link>
                                <Link to='/profile' className="px-3 py-1 text-decoration-none nav-link-hover" style={{ fontSize: 24, color: "black" }}>My Profile</Link>
                                {isAdmin && (
                                    <Link to='/admin' className="px-3 py-1 text-decoration-none nav-link-hover" style={{ fontSize: 24, color: "black" }}>
                                        Admin panel
                                    </Link>
                                )}
                                <Link to='/logout' className="px-3 py-1 text-decoration-none logoutBtn nav-link-hover" onClick={onLogout} style={{ fontSize: 24, color: "black" }}>Logout</Link>
                            </>
                        ) : (
                            <Link className="nav-link fw-bold nav-link-hover" to="/login">Login</Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}