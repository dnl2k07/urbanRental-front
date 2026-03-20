import { useState } from "react";

export default function Card({ car }) {
    const [imgIndex, setImgIndex] = useState(0);

    const currentImg = `/public/${car.img}`;

    return (
        <div className="card h-100 shadow-sm border-0 overflow-hidden mb-4" style={{ borderRadius: '15px', marginBlockStart: '100px' }}>
            <div className="position-relative" style={{ height: '200px' }}>
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                    <img
                        src={currentImg}
                        data-log={currentImg}
                        className="card-img-top w-100 h-100"
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
                <div className="d-grid">
                    <button className="btn btn-outline-secondary">Details</button>
                </div>
            </div>
        </div>
    );
}