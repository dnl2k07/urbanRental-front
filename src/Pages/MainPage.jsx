import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout, getCars } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
import Card from "../components/Card"
import { Link } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    const [cars, setCars] = useState([])

    useEffect(() => {
        async function loadCars() {
            const response = await getCars();
            console.log("Nyers válasz a szervertől:", response);

            // Megnézzük, hol van az adat (lehet response.result vagy maga a response)
            let dataToSet = [];

            if (Array.isArray(response)) {
                dataToSet = response;
            } else if (response && response.result) {
                dataToSet = Array.isArray(response.result) ? response.result : [response.result];
            }

            console.log("Beállított cars state:", dataToSet);
            setCars(dataToSet);
        }
        loadCars();
    }, []);

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
            <Navbar user={user} onLogout={onLogout} />
            <div className="container-fluid min-vh-100" id="mainWindow" style={{ paddingTop: '80px' }}>
                <div className="row h-100">
                    {cars.length > 0 ? (
                        <>
                            {/* BAL OLDAL: Csak akkor látszik, ha vannak kártyák (be van lépve) */}
                            <div className="col-md-3 px-5 d-flex flex-column justify-content-center" style={{ minHeight: '300px' }}>
                                <h1 className="display-4 fw-bold">Hey, {user?.username || 'Guest'}!</h1>
                                <p>Válogass prémium autóink közül a lenti listából.</p>
                            </div>

                            {/* JOBB OLDAL: A kártyák rácsa */}
                            <div className="col-md-9 pe-5">
                                <div className="row" style={{ minHeight: '300px' }}>
                                    {cars.map(car => (
                                        <div className="col-12 col-lg-6 col-xl-4" key={car.vehicle_id}>
                                            <Card car={car} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* KÖZÉPSŐ BLOKK: Ez jelenik meg, ha NINCS login/autó */
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center"
                            style={{ minHeight: '80vh' }}>
                            <div className="p-5 border rounded shadow-sm bg-light">
                                <h1 className="display-3 fw-bold mb-3">Welcome to UrbanRental</h1>
                                <h3 className="text-muted mb-4">Please log in to see our exclusive vehicle collection</h3>
                                
                                <button className="btn btn-danger btn-lg px-5"><Link className="nav-link fw-bold" to="/login">Take me there! :3</Link></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}