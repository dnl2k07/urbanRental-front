import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar2";

export default function ReservationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get vehicle_id from query params if available
    const urlParams = new URLSearchParams(location.search);
    const initialVehicleId = urlParams.get('vehicle_id');
    
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    // Reservation form state
    const [formData, setFormData] = useState({
        vehicle_id: initialVehicleId || '',
        pickup_date: new Date().toISOString().split('T')[0],
        return_date: ''
    });

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch("http://localhost:3000/users/whoami", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    
                    // If vehicle_id is set, load car details
                    if (formData.vehicle_id) {
                        loadCar(formData.vehicle_id);
                    }
                } else {
                    setError("You must be logged in to make a reservation");
                    navigate("/login");
                }
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        }
        
        if (!initialVehicleId && !car) {
            // If no vehicle_id in URL and we haven't loaded a car yet, show all cars
            loadAllCars();
        } else {
            loadUser();
        }
    }, []);

    async function loadCar(vehicleId) {
        try {
            const response = await fetch(`http://localhost:3000/users/cars`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                let foundCar = null;
                
                if (Array.isArray(data)) {
                    foundCar = data.find(c => c.vehicle_id == vehicleId);
                } else if (data.result && Array.isArray(data.result)) {
                    foundCar = data.result.find(c => c.vehicle_id == vehicleId);
                }
                
                setCar(foundCar);
            }
        } catch (err) {
            console.error("Failed to load car:", err);
        }
    }

    async function loadAllCars() {
        try {
            const response = await fetch("http://localhost:3000/users/cars", {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                // For now, we'll just show a simple list in the render
            }
        } catch (err) {
            console.error("Failed to load cars:", err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Load car when vehicle_id changes
        if (name === 'vehicle_id') {
            loadCar(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user?.user_id || !formData.vehicle_id || !formData.pickup_date || !formData.return_date) {
            setError("Please fill in all fields");
            return;
        }
        
        // Simple date validation
        const pickup = new Date(formData.pickup_date);
        const returndate = new Date(formData.return_date);
        
        if (returndate <= pickup) {
            setError("Return date must be after pickup date");
            return;
        }
        
        try {
            // Calculate rental days and total price
            const diffTime = Math.abs(returndate - pickup);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let totalPrice = car?.price_per_day ? car.price_per_day * diffDays : 0;
            
            // Create reservation using the backend endpoint
            const response = await fetch(
                `http://localhost:3000/users/newreservation/${user.user_id}/${formData.vehicle_id}/${formData.pickup_date}/${formData.return_date}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        vehicle_id: formData.vehicle_id,
                        pickup_date: formData.pickup_date,
                        return_date: formData.return_date,
                        total_price: totalPrice
                    })
                }
            );
            
            const data = await response.json();
            
            if (response.ok) {
                setSuccess("Reservation created successfully!");
                setError(null);
                
                // Clear form but keep user info
                setTimeout(() => {
                    navigate("/profile");
                }, 2000);
            } else {
                setError(data.error || "Failed to create reservation");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="loading-spinner"></div></div>;

    // If user is not logged in, redirect is handled in useEffect
    if (!user && !error.includes('logged in')) {
        return null;
    }

    return (
        <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <>
                <Navbar user={user} />
                <div className="container-fluid min-vh-100 pt-5 p-4">
                    <div className="row justify-content-center">
                        <div className={`col-md-8 col-lg-6 ${isVisible ? 'animate-fade-in' : ''}`}>
                            <div className="card shadow-sm border-0 animate-scale-in">
                                <div className="card-header bg-primary text-white">
                                    <h3 className="mb-0">Reserve a Car</h3>
                                </div>
                                
                                {error && <div className="alert alert-danger animate-fade-in">{error}</div>}
                                {success && <div className="alert alert-success animate-bounce-in">{success}</div>}
                                
                                <div className="card-body">
                                {!car ? (
                                    // Show car selection dropdown if no car is selected
                                    <>
                                        <h5>Select a Car</h5>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            loadCar(formData.vehicle_id);
                                        }}>
                                            <div className="mb-3">
                                                <label htmlFor="vehicleSelect" className="form-label">Available Cars</label>
                                                <select
                                                    id="vehicleSelect"
                                                    name="vehicle_id"
                                                    value={formData.vehicle_id}
                                                    onChange={handleChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    <option value="">-- Select a car --</option>
                                                    {/* For now, just show a placeholder - we'll populate with actual data */}
                                                    <option value="1">Car 1 (Example)</option>
                                                    <option value="2">Car 2 (Example)</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Select This Car
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    // Show reservation form when a car is selected
                                    <>
                                        {/* Selected Car Info */}
                                        <div className="alert alert-info">
                                            <h5 className="mb-1">Selected: {car.brand} {car.model}</h5>
                                            <p className="mb-0">Price: {car.price_per_day || 0} HUF/day</p>
                                            <small className="text-muted">ID: #{car.vehicle_id}</small>
                                        </div>

                                        {/* Reservation Form */}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="pickupDate" className="form-label">Pickup Date</label>
                                                <input
                                                    type="date"
                                                    id="pickupDate"
                                                    name="pickup_date"
                                                    value={formData.pickup_date}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="returnDate" className="form-label">Return Date</label>
                                                <input
                                                    type="date"
                                                    id="returnDate"
                                                    name="return_date"
                                                    value={formData.return_date}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                    min={new Date(formData.pickup_date || new Date()).toISOString().split('T')[0]}
                                                />
                                            </div>

                                            {/* Rental Calculation */}
                                            {formData.pickup_date && formData.return_date && (
                                                <div className="alert alert-success mb-3">
                                                    <h6>Rental Summary</h6>
                                                    <p className="mb-1">
                                                        <strong>Duration:</strong> 
                                                        {calculateDays(formData.pickup_date, formData.return_date)} days
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Total Price:</strong> 
                                                        {calculateTotalPrice(calculateDays(formData.pickup_date, formData.return_date), car.price_per_day)} HUF
                                                    </p>
                                                </div>
                                            )}

                                            <button type="submit" className="btn btn-primary w-100 mb-2">
                                                Confirm Reservation
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary w-100"
                                                onClick={() => {
                                                    setFormData({
                                                        vehicle_id: initialVehicleId || '',
                                                        pickup_date: new Date().toISOString().split('T')[0],
                                                        return_date: ''
                                                    });
                                                    setCar(null);
                                                }}
                                            >
                                                Start Over
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

// Helper functions
function calculateDays(pickup, returnDate) {
    const start = new Date(pickup);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function calculateTotalPrice(days, pricePerDay) {
    if (!days || !pricePerDay) return 0;
    return days * pricePerDay;
}
