import Gomb from "./Gomb";
import { useNavigate } from "react-router-dom";

export default function Card({ images, brand, model, color, transmission, vehicle_id, price_per_day }) {
  const carouselId = `carousel-${brand}-${model}-${Math.random()}`;
  const navigate = useNavigate();

  const handleReserve = () => {
    if (vehicle_id) {
      navigate(`/car/${vehicle_id}`);
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="card">
        <div id={carouselId} className="carousel slide">
          <div className="carousel-inner">
            {images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img src={img} className="d-block w-100 img-fluid" alt="car" />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </>
          )}
        </div>

<div className="card-body">
          {/* Car Info Section */}
          <div className="car-info mb-3">
            <h5 className="mb-2">{brand} {model}</h5>
            <p className="mb-1"><small>{color} • {transmission}</small></p>
          </div>

          {/* Price Display - Highlighted with gradient background */}
          <div className="price-section mb-3 p-2 rounded">
            <span className="price-label">Price per day:</span>
            <strong className="price-value">${price_per_day?.toFixed(2) || 'N/A'}</strong>
          </div>

          {/* Reserve Button - Gradient Theme */}
          <Gomb
            buttonClass="btn reserve-btn w-100"
            content="Reserve Now"
            onClick={handleReserve}
          />
        </div>
      </div>
    </div>
  );
}