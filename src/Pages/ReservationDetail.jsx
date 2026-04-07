import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

export default function ReservationDetail() {
    const navigate = useNavigate();
    const { vehicle_id } = useParams();
    const { user } = useAuth();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

    const carouselRef = useRef(null);
    // Form state
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    useEffect(() => {
        async function loadCar() {
            try {
                setLoading(true);
                setError("");
                const data = await getAllCarswithimg();

                if (data.error) {
                    console.log("Error from API:", data.error);
                    setError(data.error);
                    return;
                }

                if (!data || !Array.isArray(data[0]) || data[0].length === 0) {
                    setError("No cars found");
                    return;
                }

                // Find the car by vehicle_id
                const rawCars = data[0];
                const parsedVehicleId = parseInt(vehicle_id);
                const foundCar = rawCars.find(car => car.vehicle_id === parsedVehicleId);
                
                if (foundCar) {
                    const imagePaths = Array.isArray(foundCar.img)
                    ? foundCar.img.filter(img => Boolean(img))
                    : (foundCar.img ? [foundCar.img] : []);
                    setCar({
                        brand: foundCar.brand || "Unknown Brand",
                        model: foundCar.model || "Unknown Model",
                        color: foundCar.color || "N/A",
                        transmission: foundCar.transmission || "N/A",
                        license_plate: foundCar.license_plate || "N/A",
                        year: foundCar.year || "N/A",
                        price_per_day: foundCar.price_per_day ? parseFloat(foundCar.price_per_day) : 0,
                        category_name: foundCar.category_name || "N/A",
                        images: imagePaths.map(img => `http://localhost:3000/public/${img}`)
                    });
                } else {
                    setError(`Vehicle with ID ${parsedVehicleId} not found`);
                }
            } catch (err) {
                console.error("Error loading car details:", err);
                setError(err.message || "Failed to load car details");
            } finally {
                setLoading(false);
            }
        }

        if (vehicle_id) {
            loadCar();
        }
    }, [vehicle_id]);

    async function getAllCarswithimg() {
        const res = await fetch('/users/cars', {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            const data = await res.json();
            return { error: data?.error };
        }
        const data = await res.json();
        return data;
    }

    async function handleReserve() {
        if (!pickupDate || !returnDate) {
            setError("Please select both pickup and return dates");
            return;
        }

        if (user && user.user_id) {
            console.log(user.user_id, vehicle_id, pickupDate, returnDate);
            try {
                const res = await fetch('/users/newreservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        user_id: user.user_id,
                        vehicle_id: parseInt(vehicle_id),
                        pickup_date: pickupDate,
                        return_date: returnDate
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Failed to create reservation");
                    return;
                }

                alert("Reservation successful!");
                navigate("/");
            } catch (err) {
                console.error(err);
                setError("Failed to reserve car");
            }
        } else {
            setError("Please log in to make a reservation");
            navigate("/login");
        }
    }

    if (loading) {
        return (
            <div>
                <NavBar user={user} />
                <div className="container">
                    <p>Loading car details...</p>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div>
                <NavBar user={user} />
                <div className="container">
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={() => navigate("/")}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar user={user} />
            <div className="container mt-4">
                <div className="row">
                    {/* Car Images */}
                    <div className="col-md-6">
                        {car.images.length > 0 ? (
                            <div id={`reservation-carousel-${car.vehicle_id}`} className="carousel slide">
                                <div className="carousel-inner">
                                    {car.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        >
                                            <img src={img} className="d-block w-100 img-fluid" alt={car.brand} />
                                        </div>
                                    ))}
                                </div>

                                {car.images.length > 1 && (
                                    <>
                                        <button
                                            className="carousel-control-prev"
                                            type="button"
                                            data-bs-target={`#reservation-carousel-${car.vehicle_id}`}
                                            data-bs-slide="prev"
                                        >
                                            <span className="carousel-control-prev-icon"></span>
                                        </button>

                                        <button
                                            className="carousel-control-next"
                                            type="button"
                                            data-bs-target={`#reservation-carousel-${car.vehicle_id}`}
                                            data-bs-slide="next"
                                        >
                                            <span className="carousel-control-next-icon"></span>
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="alert alert-warning">No images available</div>
                        )}
                    </div>

                    {/* Car Details */}
                    <div className="col-md-6">
                        <h1>{car.brand} {car.model}</h1>

                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="mb-2">
                                    <strong>Color:</strong> {car.color}
                                </div>

                                <div className="mb-2">
                                    <strong>Transmission:</strong> {car.transmission}
                                </div>

                                <div className="mb-2">
                                    <strong>License Plate:</strong> {car.license_plate}
                                </div>

                                <div className="mb-2">
                                    <strong>Year:</strong> {car.year}
                                </div>

                                {car.category_name && (
                                    <div className="mb-2">
                                        <strong>Category:</strong> {car.category_name}
                                    </div>
                                )}

                                {car.price_per_day && (
                                    <div className="mb-2">
                                        <strong>Price per day:</strong> {car.price_per_day} Ft/day
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reservation Form */}
                        <div className="card mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Reserve this car</h5>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="pickupDate" className="form-label">Pickup Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="pickupDate"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="returnDate" className="form-label">Return Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="returnDate"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                    />
                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleReserve}
                                    disabled={!pickupDate || !returnDate}
                                >
                                    Finalize Reservation
                                </button>
                            </div>
                        </div>

                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}