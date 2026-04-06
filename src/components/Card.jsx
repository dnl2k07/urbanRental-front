import Gomb from "./Gomb";
import { useNavigate } from "react-router-dom";

export default function Card({ images, brand, model, color, transmission, vehicle_id }) {
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
          <div className="d-flex justify-content-between">
            <div>{brand}</div>
            <div>{model}</div>
            <div>{color}</div>
            <div>{transmission}</div>
          </div>

          <div className="mt-2">
            
            <Gomb
              buttonClass="btn btn-dark w-100"
              content="Reserve"
              onClick={handleReserve}
            />
          </div>
        </div>
      </div>
    </div>
  );
}