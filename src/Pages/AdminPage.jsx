import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
export default function AdminPage() {
    const navigate = useNavigate

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)

    useEffect(() => {
        async function load() {
            const data = await whoAmI()
            console.log(data);
            if (!data.error) {
                setUser(data)
            }
            setUserError(data.error)
        }
        load()
    }, [])

    async function failedLogin() {
        const data = await logout()
        if (data.error === "nincs cookie") {
            setUserError("Nincs aktív bejelentkezés!")
        }
    }

    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        failedLogin()
        navigate('/')
    }

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
                navigate("/");
            } else {
                alert(data.message || "Login failed");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout}></Navbar>
            <div className="container-fluid min-vh-100 pt-5 p-0" id="mainWindow">
                <div className="row g-0 h-100 align-items-center">

                    <div className="col-md-4 px-5">
                        <h1 className="display-4 greetingText">Hey, {user?.username || 'Admin-With-No-Name'}!</h1>
                        <div class="car-box">
                            <p>New car</p>
                            <form>
                                <div class="admin-box">
                                    <input required="number" name="carCategoryId" />
                                    <label>Car category ID</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carBrand" />
                                    <label>Car brand</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carModel" />
                                    <label>Car model</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carColor" />
                                    <label>Car color</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carTransmission" />
                                    <label>Transmission</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carNumber" />
                                    <label>Car pass number</label>
                                </div>
                                <div class="admin-box">
                                    <input required="file" name="carNumber" type="file" multiple />
                                </div>

                                {/* <div class="mb-3">
                                    <label class="form-label">Upload car pictures</label>
                                    <input type="file" class="form-control" name="carPics" accept="image/*" multiple>
                                </div> */}
                            </form>
                        </div>
                    </div>

                    <div className="col-md-8 p-0 d-flex justify-content-end">
                        <img
                            src={backgroundPic}
                            alt="Background picture"
                            className="img-fluid"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>

                </div>
            </div>
            {userError && true && <div className="alert alert-danger text-center my-2 w-25 h-25 m-5" >{userError}</div>}
        </div>
    )
}