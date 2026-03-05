import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../pics/urbanRentalLogo.png';
import { Link } from "react-router-dom";
import Login from "./Login";
import NavBar from "../components/NavBar";

export default function Register() {
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
        <div>
            <NavBar></NavBar>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 id="registerText">REGISTER</h1>
                <div className="d-flex flex-column w-50 registerBox">
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

                    </form>
                </div>
            </div>
        </div>
    );
}

