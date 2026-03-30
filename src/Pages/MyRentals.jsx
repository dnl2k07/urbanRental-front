import { useState, useEffect } from "react";
import Navbar from "../components/Navbar2";

export default function MyRentals() {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    useEffect(() => {
        async function loadData() {
            try {
                // Check if user is logged in
                const userResponse = await fetch("http://localhost:3000/users/whoami", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                    
                    // Load user's reservations
                    const reservationsResponse = await fetch("http://localhost:3000/users/reservation", {
                        method: 'GET',
                        credentials: 'include'
                    });
                    
                    if (reservationsResponse.ok) {
                        const data = await reservationsResponse.json();
                        setReservations(Array.isArray(data.result) ? data.result : [data.result]);
                    } else {
                        setError("Failed to load reservations");
                    }
                } else {
                    setError("You must be logged in to view your rentals");
                    // Redirect to login could be handled here
                }
            } catch (err) {
                setError("Network error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, []);

    async function deleteReservation(id) {
        try {
            const response = await fetch(`http://localhost:3000/users/deletereservation/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (response.ok) {
                // Update state to remove deleted reservation
                setReservations(prev => prev.filter(res => res.reservation_id !== id));
                setError("Reservation cancelled successfully");
            } else {
                setError("Failed to cancel reservation");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    }

    if (loading) return <div className="text-center mt-5"><div className="loading-spinner"></div></div>;

    return (
        <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <>
                <Navbar user={user} />
                <div className="container-fluid min-vh-100 pt-5 p-4">
                    <div className="row justify-content-center">
                        <div className={`col-md-10 ${isVisible ? 'animate-fade-in' : ''}`}>
                            <div className="card shadow-sm border-0 mb-4 animate-scale-in">
                                <div className="card-header bg-primary text-white">
                                    <h3 className="mb-0">My Reservations</h3>
                                </div>
                                
                                {error && <div className="alert alert-danger mx-3 mt-3 animate-fade-in">{error}</div>}
                            {reservations.length === 0 && !error && (
                                <div className="text-center py-5">
                                    <h4>No reservations found. Start by reserving a car!</h4>
                                </div>
                            )}
                            
                            <div className="card-body">
                                {reservations.map((reservation) => {
                                    // Extract vehicle info if available
                                    const vehicle = reservation.vehicle || {};
                                    
                                    return (
                                        <div key={reservation.reservation_id} className="mb-3 card shadow-sm border-0">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h5 className="mb-0">
                                                        {vehicle.brand || 'Car'} {vehicle.model || reservation.vehicle_id}
                                                    </h5>
                                                    <span className={`badge ${
                                                        reservation.status === 'confirmed' ? 'bg-success' :
                                                        reservation.status === 'pending' ? 'bg-warning text-dark' :
                                                        reservation.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                                                    }`}>
                                                        {reservation.status || 'pending'}
                                                    </span>
                                                </div>
                                                
                                                <div className="row g-3 mt-2">
                                                    <div className="col-md-6">
                                                        <p className="mb-1"><strong>Pickup Date:</strong></p>
                                                        <p className="text-muted">{new Date(reservation.pickup_date).toLocaleDateString()}</p>
                                                    </div>
                                                    
                                                    <div className="col-md-6">
                                                        <p className="mb-1"><strong>Return Date:</strong></p>
                                                        <p className="text-muted">{new Date(reservation.return_date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                
                                                {reservation.total_price && (
                                                    <div className="row mt-2">
                                                        <div className="col-md-6">
                                                            <p className="mb-1"><strong>Total Price:</strong></p>
                                                            <p className="text-muted fw-bold">{reservation.total_price} HUF</p>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Action buttons */}
                                                <div className="mt-3">
                                                    {reservation.status !== 'cancelled' && reservation.status !== 'completed' && (
                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteReservation(reservation.reservation_id)}
                                                        >
                                                            Cancel Reservation
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}