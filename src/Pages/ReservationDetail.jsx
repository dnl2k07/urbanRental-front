import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Payment Modal Component
function PaymentModal({ isOpen, onClose, amount, onProcessPayment }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cardName, setCardName] = useState("");
    const [cvc, setCvc] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onProcessPayment({
                cardNumber,
                expiryDate,
                cardName,
                cvc,
                amount
            });

            onClose();
        } catch (error) {
            console.error("Payment error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Payment Details</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    placeholder="****-****-****-1234"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardName"
                                    placeholder="CARDHOLDER NAME"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cvc" className="form-label">CVC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cvc"
                                    placeholder="***"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="alert alert-info">
                                <strong>Amount to Pay:</strong> ${amount.toFixed(2)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ReservationDetail() {
  const navigate = useNavigate();
  const { vehicle_id } = useParams();
  const { user } = useAuth();
  const { showToast } = useContext(ToastContext);

  // car states
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  
  // Form state
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  
  // Carousel ref for manual control if needed
  const carouselRef = useRef(null);

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
          // Handle potential undefined/null image values gracefully
          const imagePaths = Array.isArray(foundCar.img) 
            ? foundCar.img.filter(img => Boolean(img))
            : (foundCar.img ? [foundCar.img] : []);
            
          setCar({
            vehicle_id: foundCar.vehicle_id,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      showToast("Please select both pickup and return dates", "warning");
      return;
    }

    // Calculate rental amount
    const totalAmount = calculateRentalAmount(pickupDate, returnDate, car.price_per_day);
    setCalculatedAmount(totalAmount);

    // Open payment modal for mock payment process
    if (user && user.user_id) {
      setPaymentModalOpen(true);
    } else {
      setError("Please log in to make a reservation");
      showToast("Please log in to make a reservation", "error");
      navigate("/login");
    }
  }

  // Payment processing handler
  async function handleProcessPayment(paymentData) {
    try {
      showToast("Processing payment...", "info");

      const res = await fetch('http://localhost:3000/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          reservationId: `RES-${Date.now()}`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Payment processing failed", "error");
        throw new Error(data.error || "Payment failed");
      }

      // Payment successful, now create reservation
      await createReservation(data.transaction);
      
    } catch (err) {
      console.error("Payment error:", err);
      showToast(err.message || "Payment processing failed", "error");
      throw err;
    }
  }

  async function createReservation(transactionData) {
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
        showToast(data.error || "Reservation failed", "error");
        setError(data.error || "Failed to create reservation");
        return;
      }

      // Show success message with toast
      showToast("Reservation successful! Payment processed.", "success");
      
      // Close modal and navigate
      setPaymentModalOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Failed to reserve car");
      showToast("Failed to complete reservation", "error");
    }
  }

  // Calculate rental amount helper
  function calculateRentalAmount(pickupDate, returnDate, pricePerDay) {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const actualDays = Math.max(1, diffDays);
    return actualDays * pricePerDay;
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
                    <strong>Price per day:</strong> ${car.price_per_day}
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
      <Footer></Footer>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)}
        amount={calculatedAmount}
        onProcessPayment={handleProcessPayment}
      />
    </div>
  );
}
