import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { whoAmI, getAllCarswithimg, filterCars } from "../usersFolder/users.js"
import Card from "../components/Card"
import { useAuth } from "../context/AuthContext.jsx"
import Footer from "../components/Footer";

export default function Home() {
    const navigate = useNavigate();
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Csak ezek maradtak a szűréshez:
    const [transmission, setTransmission] = useState("");
    const [sortOrder, setSortOrder] = useState("low_to_high");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { user, setUser, onLogout } = useAuth();
    const [cars, setCars] = useState([]);
    const [userError, setUserError] = useState('');

    // Autók betöltése
    useEffect(() => {
        async function loadCars() {
            setLoading(true);
            const data = await getAllCarswithimg();
            if (data.error) {
                console.log("Error from API:", data.error);
                setLoading(false);
                return;
            }

            if (!data || data.length === 0) {
                setCars([]);
                setFilteredCars([]);
                setLoading(false);
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
            setFilteredCars(groupedCars);
            setLoading(false);
        }
        loadCars();
    }, []);

    async function applyFilters(e) {
        if (e) e.preventDefault();

        const filterData = {
            transmission: transmission || undefined,
            sort_order: sortOrder
        };

        // Tisztítás
        Object.keys(filterData).forEach(key => {
            if (!filterData[key]) delete filterData[key];
        });

        const data = await filterCars(filterData);

        // Ellenőrizzük, hogy jött-e adat
        const resultsFromBackend = data.result;

        if (!resultsFromBackend || resultsFromBackend.length === 0) {
            console.warn("Nincs találat.");
            setFilteredCars([]);
            return;
        }

        // 1. Megjegyezzük az eredeti sorrendet az ID-k alapján
        const orderedIds = [...new Set(resultsFromBackend.map(car => car.vehicle_id))];

        // 2. Csoportosítás (képek összegyűjtése)
        const groupedMap = resultsFromBackend.reduce((acc, car) => {
            if (!acc[car.vehicle_id]) {
                acc[car.vehicle_id] = {
                    ...car,
                    images: []
                };
            }
            if (car.img) {
                acc[car.vehicle_id].images.push(`http://localhost:3000/public/${car.img}`);
            }
            return acc;
        }, {});

        // 3. Visszaalakítás tömbbé az EREDETI (backend-es) sorrendben
        const groupedCars = orderedIds.map(id => groupedMap[id]);

        console.log("Rendezett és csoportosított autók:", groupedCars);
        setFilteredCars(groupedCars);
    }

    // Reset filters
    function resetFilters() {
        setTransmission("");
        setSortOrder("low_to_high");
        loadCars();
    }

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

    // 2. A korai return CSAK EZUTÁN jöhet:
    if (loading && cars.length === 0) {
        return (
            <div>
                <Navbar user={user} onLogout={onLogout}></Navbar>
                <p>Loading...</p>
            </div>
        );
    }


    return (
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout} />
            <div className="container-fluid min-vh-100" id="mainWindow" style={{ paddingTop: '80px' }}>
                <div className="row h-100">
                    {user ? (
                        <>
                            <div className="col-md-3 px-4">
                                <div className="sticky-top" style={{ position: 'fixed', top: '120px', width: 'inherit', maxWidth: '280px', zIndex: 10 }}>
                                    <div className="card border-0 shadow-sm p-4 bg-light" style={{ maxWidth: '400px', borderRadius: '15px' }}>
                                        <h2 className="fw-bold mb-1" style={{ letterSpacing: '-1px' }}>Hey, Admin Badmin!</h2>
                                        <p className="text-muted small mb-4">Choose from our huge selection!</p>

                                        <hr className="mb-4" />

                                        <h5 className="fw-bold mb-3">Filter</h5>

                                        <button
                                            className="btn btn-outline-secondary btn-sm mb-4"
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        >
                                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                                        </button>

                                        {isFilterOpen && (
                                            <form onSubmit={applyFilters}>

                                                {/* Transmission Select */}
                                                <div className="mb-3 d-flex align-items-center gap-2">
                                                    <label className="form-label small fw-bold mb-0">Transmission</label>
                                                    <select
                                                        className="form-select form-select-sm w-auto"
                                                        value={transmission}
                                                        onChange={(e) => setTransmission(e.target.value)}
                                                    >
                                                        <option value="">Any</option>
                                                        <option value="Automatic">Automatic</option>
                                                        <option value="Manual">Manual</option>
                                                    </select>
                                                </div>

                                                {/* Sort */}
                                                <div className="mb-4">
                                                    <label className="form-label small fw-bold mb-1">Sort by Price</label>
                                                    <select
                                                        className="form-select"
                                                        value={sortOrder}
                                                        onChange={(e) => setSortOrder(e.target.value)}
                                                    >
                                                        <option value="low_to_high">Low to High</option>
                                                        <option value="high_to_low">High to Low</option>
                                                    </select>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="d-flex flex-column gap-2 mb-4">
                                                    <button type="button" className="btn btn-outline-dark btn-sm text-start ps-3" onClick={resetFilters}>Reset Filters</button>
                                                </div>

                                                {/* Main CTA */}
                                                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold" style={{ borderRadius: '8px' }}>
                                                    Apply filter
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* JOBB OLDAL: KÁRTYÁK */}
                            <div className="col-md-9 pe-5">
                                <div className="row g-4">
                                    {/* JAVÍTÁS: cars helyett filteredCars */}
                                    {filteredCars.length === 0 ? (
                                        <div className="col-12 text-center py-5">
                                            <p className="h4 text-muted">There aren't any cars right meow 🐱</p>
                                        </div>
                                    ) : (
                                        filteredCars.map((car) => (
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
            <Footer></Footer>
        </div>
    )
}