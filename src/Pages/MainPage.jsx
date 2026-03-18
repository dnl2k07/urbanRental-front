import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout, getCars } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
import Card from "../components/Card"

export default function Home() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    const [cars, setCars] = useState([])

    useEffect(() => {
        async function loadCars() {
            const data = await getCars()
            console.log("Cars from backend:", data)
    
            // Ez a helyes, ha egyetlen autó van a result-ban:
            if(data.result) {
                setCars(Array.isArray(data.result) ? data.result : [data.result])
            } else {
                setCars([])
            }
        }
        loadCars()
    }, [])

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

    return (
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout}></Navbar>
            <div className="container-fluid min-vh-100 pt-5 p-0" id="mainWindow">
                <div className="row g-0 h-100 align-items-center">

                    <div className="col-md-4 px-5">
                        <h1 className="display-4">Hey, {user?.username || 'Tester'}!</h1>
                        {cars.map(car => (
                            <Card key={car.vehicle_id} car={car} />
                        ))}

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