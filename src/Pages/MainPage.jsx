import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
import { whoAmI, logout, getCars } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
import Card from "../components/Card"
import Navbar from "../components/Navbar2"

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
            <div className="container-fluid min-vh-100 pt-5" id="mainWindow">
                <div className="row h-100">

                    {/* BAL OLDAL: Üdvözlés és infó */}
                    <div className="col-md-3 px-5 d-flex flex-column justify-content-center">
                        <h1 className="display-4 fw-bold">Hey, {user?.username || 'Tester'}!</h1>
                        <p>Válogass prémium autóink közül a lenti listából.</p>
                    </div>

                    {/* JOBB OLDAL: A kártyák rácsa (Grid) */}
                    <div className="col-md-9 pe-5">
                        <div className="row g-4 overflow-auto" style={{ maxHeight: '85vh' }}>
                            {cars.length > 0 ? (
                                cars.map(car => (
                                    <div className="col-12 col-lg-6 col-xl-4" key={car.vehicle_id}>
                                        <Card car={car} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center mt-5">
                                    <h3>Nincsenek elérhető autók... 🚗</h3>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            {userError && <div className="alert alert-danger fixed-bottom m-3 w-25">{userError}</div>}
        </div>
    )
}