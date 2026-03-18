import { useState } from "react"; // 1. Ezt importáld!

const BACKEND_URL = 'http://localhost:3000';

// 2. Csak EGY függvény legyen, és az adjon vissza (return) HTML-t!
export default function Card({ car }) {
    const [imgIndex, setImgIndex] = useState(0);

    // Kezeljük, ha a backendről sima stringként, vagy tömbként jön a kép
    // (A korábbi JOIN-os megoldástól függően)

    const currentImg = `${BACKEND_URL}/${car.img}`;
    console.log("DEBUG - Ez a kép URL-je:", currentImg);
    return (
        <div className="card h-100 shadow-sm border-0 overflow-hidden mb-4" style={{ borderRadius: '15px', marginBlockStart: '100px' }}>
            {/* Kép rész */}
            <div className="position-relative" style={{ height: '200px' }}>
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                    <img
                        src={currentImg}
                        className="card-img-top w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        alt={`${car.brand} ${car.model}`}
                        onError={(e) => {
                            console.log("Nem jön be a kép:", e.target.src);
                            e.target.src = "https://via.placeholder.com";
                        }}
                    />
                </div>
                <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {car.price_per_day} HUF / day
                </span>
            </div>

            {/* Adatok rész */}
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