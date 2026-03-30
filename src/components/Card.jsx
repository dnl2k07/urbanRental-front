import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ car }) {
    const [imgIndex, setImgIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const currentImg = `/public/${car.img}`;

    return (
        <div className={`card h-100 shadow-sm border-0 overflow-hidden mb-4 animate-fade-in-up ${isVisible ? 'animate-scale-in' : ''}`} style={{ borderRadius: '15px', marginBlockStart: '100px' }}>
            <div className="position-relative card-img-top-wrapper" style={{ height: '200px' }}>
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                    <img
                        src={currentImg}
                        data-log={currentImg}
                        className={`card-img-top w-100 h-100 ${isVisible ? '' : 'opacity-0'} animate-fade-in`}
                        style={{ objectFit: 'cover' }}
                        alt={`${car.brand} ${car.model}`}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com";
                        }}
                    />
                </div>
                <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {car.price_per_day} HUF / day
                </span>
            </div>

            <div className="card-body">
                <h5 className="card-title fw-bold text-uppercase">{car.brand} {car.model}</h5>
                <div className="d-flex justify-content-between text-muted mb-2">
                    <span>{car.transmission}</span>
                    <span>{car.year}</span>
                    <span>{car.color}</span>
                </div>
                <hr />
                <div className="d-grid gap-2">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(`/car/${car.vehicle_id}`)}
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}