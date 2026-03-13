import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
export default function AdminPage() {
    const navigate = useNavigate

        //     < input
        // name = "name"
        // value = { user.name }
        // onChange = { handleChange }
        // placeholder = "Név"
        //>

    const [car, setCar] = useState({});
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
        const adminData = {
            email: email,
            psw: psw
        };

        try {
            const response = await fetch("http://localhost:3000/admin/login", {
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
                            <form onSubmit={handleSubmit}>
                                <div class="admin-box">
                                    <input required="number" name="carCategoryId" onChange={(e) => setCategoryID(e.target.value)} />
                                    <label>Car category ID</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carBrand" onChange={(e) => setCarBrand(e.target.value)} />
                                    <label>Car brand</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carModel" onChange={(e) => setCarModel(e.target.value)} />
                                    <label>Car model</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carColor" onChange={(e) => setCarColor(e.target.value)} />
                                    <label>Car color</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carTransmission" onChange={(e) => setTransmission(e.target.value)} />
                                    <label>Transmission</label>
                                </div>
                                <div class="admin-box">
                                    <input required="text" name="carNumber" onChange={(e) => setCarPass(e.target.value)} />
                                    <label>Car pass number</label>
                                </div>
                                <button type="submit" className="btn btn-secondary w-100">
                                    Upload new car
                                </button>
                                {/* <div class="mb-3">
                                    <label class="form-label">Upload car pictures</label>
                                    <input type="file" class="form-control" name="carPics" onChange={handleCarsUpload} accept="image/*" multiple/>
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

