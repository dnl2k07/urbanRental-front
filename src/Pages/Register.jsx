import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../pics/urbanRentalLogo.png';
import { Link } from "react-router-dom";
import Login from "./Login";
import Navbar from "../components/Navbar2";

export default function Register() {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
    }, []);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [psw, setPsw] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            username: username,
            psw: psw
        };

        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            console.log("Server response:", data);

            if (response.ok) {
                navigate("/");
            } else {
                alert(data.message || "Registration failed");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <Navbar></Navbar>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100 mt-5">
                <h1 id="registerText" className={isVisible ? 'animate-fade-in-down' : ''}>REGISTER</h1>
                <div className={`d-flex flex-column w-50 registerBox ${isVisible ? 'animate-scale-in' : ''}`}>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group mb-3">
                            <label htmlFor="inputUsername">Username</label>
                            <input
                                type="text"
                                className="form-control inputArea"
                                id="inputUsername"
                                placeholder="Your very cool username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="inputEmail">Email address</label>
                            <input
                                type="email"
                                className="form-control inputArea"
                                id="inputEmail"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p>
                                We'll never share your email with anyone else.
                            </p>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                type="password"
                                className="form-control inputArea"
                                id="inputPassword"
                                placeholder="Password"
                                value={psw}
                                onChange={(e) => setPsw(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-secondary w-100">
                            Register
                        </button>
                        <div id="accountHaveP">
                            <p id="smallLoginText">You already have an account?</p>
                            <Link to="/login">
                                <button >Login here!</button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

