import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { whoAmI, getAllCarswithimg } from "../usersFolder/users.js";
import Card from "../components/Card"
import { useAuth } from "../context/AuthContext.jsx"

export default function Home() {
    const navigate = useNavigate()

    // 1. HIBA JAVÍTVA: A useAuth-ot objektumként { } kell lebontani!
    const { user, setUser, onLogout } = useAuth()

    const [cars, setCars] = useState([])
    const [userError, setUserError] = useState('')

    // Autók betöltése
    useEffect(() => {
        async function loadCars() {
            const data = await getAllCarswithimg();

            if (data.error) {
                console.log("Error from API:", data.error);
                return;
            }

            if (!data || data.length === 0) {
                setCars([]);
                return;
            }

            const rawCars = data[0];

            const groupedCars = Object.values(
                rawCars.reduce((acc, car) => {
                    if (!acc[car.vehicle_id]) {
                        acc[car.vehicle_id] = {
                            vehicle_id: car.vehicle_id,
                            brand: car.brand,
                            model: car.model,
                            color: car.color,
                            transmission: car.transmission,
                            price_per_day: car.price_per_day,
                            images: []
                        };
                    }

                    if (car.img) {
                        acc[car.vehicle_id].images.push(
                            `http://localhost:3000/public/${car.img}`
                        );
                    }

                    return acc;
                }, {})
            );

            setCars(groupedCars);
        }
        loadCars();
    }, []);

    // Felhasználó ellenőrzése
    useEffect(() => {
        async function load() {
            const data = await whoAmI()
            if (!data.error) {
                setUser(data)
            } else {
                setUserError(data.error)
            }
        }
        load()
    }, [setUser])


    return (
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout} />
            <div className="container-fluid min-vh-100" id="mainWindow" style={{ paddingTop: '80px' }}>
                <div className="row h-100">
                    {user ? (
                        <>
                            <div className="col-md-3 px-4">
                                <div className="sticky-top" style={{ position: 'fixed', top: '120px',  width: 'inherit', maxWidth: '280px', zIndex: 10 }}>
                                    <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                                        <h2 className="fw-bold mb-1">Hey, {user?.username || 'Guest'}!</h2>
                                        <p className="text-muted small mb-4">Choose from our huge selection!</p>

                                        <hr />
                                        <h5 className="fw-bold mb-3">Filter</h5>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold">Brand</label>
                                            <select className="form-select form-select-sm shadow-none">
                                                <option value="">All brands</option>
                                            {/* ezek itt fixelt értékek */}
                                                <option value="opel">Opel</option>
                                                <option value="suzuki">Suzuki</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label small fw-bold">Transmission</label>
                                            <div className="form-check small">
                                                <input className="form-check-input" type="checkbox" id="manual" />
                                                <label className="form-check-label" htmlFor="manual">Manual</label>
                                            </div>
                                        </div>

                                        <button className="btn btn-dark w-100 btn-sm fw-bold mt-2">Apply filter</button>
                                    </div>
                                </div>
                            </div>

                            {/* JOBB OLDAL: KÁRTYÁK */}
                            <div className="col-md-9 pe-5">
                                <div className="row g-4">
                                    {cars.length === 0 ? (
                                        <div className="col-12 text-center py-5">
                                            <p className="h4 text-muted">There aren't any cars right meow 🐱</p>
                                        </div>
                                    ) : (
                                        cars.map((car) => (
                                            <Card key={car.vehicle_id} car={car} />
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center text-center"
                            style={{ minHeight: '80vh' }}>
                            <div className="p-5 border rounded shadow-sm bg-light">
                                <h1 className="display-3 fw-bold mb-3">Welcome to UrbanRental</h1>
                                <h3 className="text-muted mb-4">Please log in to see our exclusive vehicle collection</h3>
                                <button className="btn btn-danger btn-lg px-5">
                                    <Link className="nav-link fw-bold" to="/login">Take me there! :3</Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}