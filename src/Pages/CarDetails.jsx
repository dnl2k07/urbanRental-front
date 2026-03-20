import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCar() {
            try {
                // Using the same API endpoint as MainPage
                const response = await fetch(`http://localhost:3000/users/cars`, {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    setError("Failed to load car details");
                    setLoading(false);
                    return;
                }
                
                const data = await response.json();
                
                // Find the specific car by ID
                let foundCar = null;
                if (Array.isArray(data)) {
                    foundCar = data.find(c => c.vehicle_id == id);
                } else if (data.result && Array.isArray(data.result)) {
                    foundCar = data.result.find(c => c.vehicle_id == id);
                }
                
                setCar(foundCar);
            } catch (err) {
                setError("Failed to load car details: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        loadCar();
    }, [id]);

    const currentImg = car?.img ? `/public/${car.img}` : "https://via.placeholder.com/400x300?text=No+Image";

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
    if (!car) return <div className="alert alert-warning text-center mt-5">Car not found</div>;

    return (
        <>
            <Navbar />
            <div className="container-fluid min-vh-100 pt-5 p-4">
                <div className="row">
                    {/* Car Image */}
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="position-relative" style={{ height: '400px' }}>
                                <img
                                    src={currentImg}
                                    className="card-img-top w-100 h-100"
                                    style={{ objectFit: 'cover', borderRadius: '15px' }}
                                    alt={`${car.brand} ${car.model}`}
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Car Details */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="mb-3 fw-bold text-uppercase">{car.brand} {car.model}</h2>
                                
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="badge bg-primary fs-5 py-3 px-4">
                                        {car.price_per_day} HUF / day
                                    </span>
                                    <span className="badge bg-info text-dark fw-bold">
                                        #{car.vehicle_id}
                                    </span>
                                </div>

                                <hr />

                                {/* Car Specifications */}
                                <div className="mb-4">
                                    <h5>Specifications</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span><strong>Category:</strong></span>
                                            <span>{car.category_id || 'N/A'}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span><strong>Transmission:</strong></span>
                                            <span>{car.transmission || 'N/A'}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span><strong>Year:</strong></span>
                                            <span>{car.year || 'N/A'}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span><strong>Color:</strong></span>
                                            <span>{car.color || 'N/A'}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <span><strong>License Plate:</strong></span>
                                            <span>{car.license_plate || 'N/A'}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto d-grid gap-2">
                                    <button 
                                        className="btn btn-primary btn-lg"
                                        onClick={() => navigate(`/reservation?vehicle_id=${car.vehicle_id}`)}
                                    >
                                        Reserve This Car
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back to Cars
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}