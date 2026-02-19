import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../pics/urbanRentalLogo.png';
import Register from "./Register";

export default function HomePage() {

    return (
        <div>
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
                        <li className="nav-item navLinks m-2 fw-bolder">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item navLinks m-2 fw-bolder">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 id="homePageHI">Welcome home! :D</h1>
            </div>
        </div>
    );
}

