import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import Footer from '../components/Footer'

export default function Login() {
    const { updateUserData } = useAuth();
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            psw: psw
        };

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
                credentials: "include"
            });

            const data = await response.json();

            console.log("Server response:", data);

            if (response.ok) {
                await updateUserData(); 
                navigate("/"); 
            } else {
                const data = await response.json();
                alert(data.message || "Login failed");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 id="registerText">LOGIN</h1>
                <div className="d-flex flex-column w-50 registerBox">
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                        <div id="accountHaveP">
                            <p id="smallLoginText">You don't have an account yet?</p>
                            <Link to="/register">
                                <button >Create one!</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

