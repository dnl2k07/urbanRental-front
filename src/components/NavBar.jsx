import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../pics/urbanRentalLogo.png';
import { useState, useEffect } from "react"

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user
    //console.log(isLoggedIn);
    const isAdmin = user?.role === 'admin'
    return (

        <nav className="navbar navbar-expand-lg">
            <Link to="/">
                <img src={logo} alt="URLogo" width={250} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav">
                    <li className="nav-item navLinks m-2">
                        <a className="nav-link disabled" href="#">Rentable car collection</a>
                    </li>
                    <li className="nav-item navLinks m-2">
                        <a className="nav-link disabled" href="#">Location</a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto ml-auto">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item navLinks m-2 fw-bolder">
                                <Link className="nav-link" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item navLinks m-2 fw-bolder">
                                <Link className="nav-link" to="/myRental">My Rentals</Link>
                            </li>
                            <li>
                                {isAdmin&&<Link to='/admin' className="px-3 py-1 text-decoration-none rounded" style={{fontSize:24,color:"black"}}>Admin panel</Link>}

                            </li>
                            <li className="nav-item navLinks m-2 fw-bolder">
                                <Link className="nav-link" to="/logout">logout</Link>
                            </li>

                        </>
                    ):(
                        <>
                            <li className="nav-item navLinks m-2 fw-bolder">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>

                        </>
                    )}
                </ul>
            </div>
        </nav>

    )
}
