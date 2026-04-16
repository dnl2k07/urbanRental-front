import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function MyReservations() {
    const { user, onLogout } = useAuth();

    // State for reservations
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for modal (update reservation)
    const [showModal, setShowModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [formData, setFormData] = useState({
        vehicle_id: '',
        pickup_date: '',
        return_date: ''
    });
    const today = new Date().toLocaleDateString('en-CA');

    // Fetch reservations on component mount
    useEffect(() => {
        if (user) {
            fetchReservations();
        }
    }, [user]);

    async function fetchReservations() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/users/reservation`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Hiba történt a foglalások lekérdezésekor');
                return;
            }

            const data = await res.json();
            console.log('Reservations:', data);
            const reservationsData = Array.isArray(data.result) ? data.result : (Array.isArray(data) ? data : []);
            setReservations(reservationsData);
        } catch (err) {
            console.error("Error fetching reservations:", err);
            setError('Hiba a szerverrel való kommunikációban');
        } finally {
            setLoading(false);
        }
    }

    // Handle delete reservation
    async function handleDelete(reservation_id) {
        if (!window.confirm('Biztosan törölni szeretnéd ezt a foglalást?')) {
            return;
        }
        console.log(reservation_id);
        console.log('Reservations:', reservations);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/users/deletereservation/${reservation_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            console.log(res);

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Hiba történt a törlés során');
                return;
            }

            alert('Foglalás sikeresen törölve!');
            fetchReservations(); // Refresh the list
        } catch (err) {
            console.error("Error deleting reservation:", err);
            alert('Hiba a szerverrel való kommunikációban');
        }
    }

    // Handle update reservation - open modal
    function handleUpdate(reservation) {
        setSelectedReservation(reservation);
        setFormData({
            pickup_date: reservation.pickup_date,
            return_date: reservation.return_date
        });
        setShowModal(true);
    }

    // Handle form submission for update
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/users/updatereservation`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vehicle_id: formData.vehicle_id,
                    pickup_date: formData.pickup_date,
                    return_date: formData.return_date,
                    status: formData.status || selectedReservation?.status || 'lefoglalva',
                    reservation_id: selectedReservation?.reservation_id
                })
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Hiba történt a módosítás során');
                return;
            }

            alert('Foglalás sikeresen módosítva!');
            setShowModal(false);
            fetchReservations(); // Refresh the list
        } catch (err) {
            console.error("Error updating reservation:", err);
            alert('Hiba a szerverrel való kommunikációban');
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 logoutErrorBox">
            <NavBar user={user} onLogout={onLogout}></NavBar>

            <div className="container py-5 flex-grow-1" style={{ marginTop: '80px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>My Reservations</h1>

                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '15px',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        {error}
                    </div>
                )}

                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                ) : reservations.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px'
                    }}>
                        <h3>You don't have any reservations yet!</h3>
                        <p>You can choose a car from the main page!</p>
                    </div>
                ) : (
                    <>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: '#db5b34', color: '#fff' }}>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Car (Brand)</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Pickup date</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Return date</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>State</th>
                                    <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation.reservation_id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px' }}>
                                            {reservation.brand ? (
                                                <>
                                                    <div><strong>{reservation.brand} {reservation.model}</strong></div>
                                                    {reservation.color && <div style={{ fontSize: '0.85em', color: '#666' }}>{reservation.color}, {reservation.transmission}</div>}
                                                </>
                                            ) : (
                                                <span>Loading car datas...</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            {new Date(reservation.pickup_date).toLocaleDateString('hu-HU', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            {new Date(reservation.return_date).toLocaleDateString('hu-HU', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td style={{
                                            padding: '15px',
                                            color: reservation.status === 'lefoglalva' ? '#e74c3c' : '#27ae60'
                                        }}>
                                            {reservation.status === 'lefoglalva' ? 'Reserved' : 'Active'}
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleUpdate(reservation)}
                                                style={{
                                                    backgroundColor: '#979287',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    marginRight: '10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Modify
                                            </button>
                                            <button
                                                onClick={() => handleDelete(reservation.reservation_id)}
                                                style={{
                                                    backgroundColor: '#e74c3c',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {/* Update Reservation Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderRadius: '10px',
                        width: '90%',
                        maxWidth: '500px'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Foglalás Módosítása</h2>

                        {/* Show current reservation info */}
                        {selectedReservation && (
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '20px',
                                fontSize: '0.9em'
                            }}>
                                <strong>Jelenlegi információk:</strong>
                                <div> Jármű: {selectedReservation.brand ? `${selectedReservation.brand} ${selectedReservation.model}` : `ID: ${selectedReservation.vehicle_id}`}</div>
                                <div> Felvétel: {new Date(selectedReservation.pickup_date).toLocaleDateString('hu-HU')}</div>
                                <div> Visszaadás: {new Date(selectedReservation.return_date).toLocaleDateString('hu-HU')}</div>
                                <div> Státusz: {selectedReservation.status || 'Foglalva'}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Pickup date:
                                </label>
                                <input
                                    type="date"
                                    name="pickup_date"
                                    // split('T')[0] kell, hogy az ISO dátumból csak az YYYY-MM-DD maradjon
                                    value={formData.pickup_date ? formData.pickup_date.split('T')[0] : ''}
                                    min={today} // Nem enged a múltba
                                    onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Return date:
                                </label>
                                <input
                                    type="date"
                                    name="return_date"
                                    value={formData.return_date ? formData.return_date.split('T')[0] : ''}
                                    // A leadás minimuma a felvétel napja vagy a mai nap
                                    min={formData.pickup_date ? formData.pickup_date.split('T')[0] : today}
                                    onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#3498db',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    Modify
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        backgroundColor: '#95a5a6',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer></Footer>
        </div>
    );
}