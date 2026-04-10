import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function MyReservations() {
  const { user, onLogout} = useAuth();
  
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
       // Ensure we always have an array - handle both {result: [...]} and direct array responses
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
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/users/deletereservation/${reservation_id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
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
      vehicle_id: reservation.vehicle_id,
      pickup_date: reservation.pickup_date,
      return_date: reservation.return_date,
      status: reservation.status || 'lefoglalva'
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
    <div>
      <NavBar user={user} onLogout={onLogout}></NavBar>
      
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Saját Foglalásaim</h1>
        
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
          <p style={{ textAlign: 'center' }}>Betöltés...</p>
        ) : reservations.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <h3>Még nincsenek foglalásaid</h3>
            <p>Állj rendelkezésedre álló járművek között választhatsz a Főoldalon.</p>
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
                 <tr style={{ backgroundColor: '#3498db', color: '#fff' }}>
                   <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Jármű (Márka/Modell)</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Felveszés dátuma</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Visszaadás dátuma</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Státusz</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.reservation_id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>
                      {reservation.brand ? (
                        <>
                          <div><strong>{reservation.brand} {reservation.model}</strong></div>
                          <div style={{ fontSize: '0.85em', color: '#666' }}>ID: {reservation.vehicle_id}</div>
                          {reservation.color && <div style={{ fontSize: '0.85em', color: '#666' }}>{reservation.color}, {reservation.transmission}</div>}
                        </>
                      ) : (
                        <span>Jármű adatok betöltése...</span>
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
                      {reservation.status === 'lefoglalva' ? 'Foglalva' : 'Aktív'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleUpdate(reservation)}
                        style={{
                          backgroundColor: '#f39c12',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 16px',
                          marginRight: '10px',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Módosítás
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
                        Törlés
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
                <div> Felveszés: {new Date(selectedReservation.pickup_date).toLocaleDateString('hu-HU')}</div>
                <div> Visszaadás: {new Date(selectedReservation.return_date).toLocaleDateString('hu-HU')}</div>
                <div> Státusz: {selectedReservation.status || 'Foglalva'}</div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Jármű ID:
                </label>
                <input
                  type="number"
                  name="vehicle_id"
                  value={formData.vehicle_id}
                  onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})}
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
                  Felveszés dátuma:
                </label>
                <input
                  type="date"
                  name="pickup_date"
                  value={formData.pickup_date}
                  onChange={(e) => setFormData({...formData, pickup_date: e.target.value})}
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
                  Visszaadás dátuma:
                </label>
                <input
                  type="date"
                  name="return_date"
                  value={formData.return_date}
                  onChange={(e) => setFormData({...formData, return_date: e.target.value})}
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
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Státusz:
                </label>
                <select
                  name="status"
                  value={formData.status || selectedReservation?.status || 'lefoglalva'}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                >
                  <option value="lefoglalva">Foglalva</option>
                  <option value="aktív">Aktív</option>
                  <option value="lezárt">Lezárva</option>
                </select>
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
                  Módosítás
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
                  Mégse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}