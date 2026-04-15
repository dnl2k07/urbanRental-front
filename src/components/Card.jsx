import Gomb from "./Gomb";
import { useNavigate } from "react-router-dom";

export default function Card({ car }) {
    const { vehicle_id, brand, model, color, transmission, images, price_per_day, year } = car;
    const carouselId = `carousel-${vehicle_id}`;
    const navigate = useNavigate();

    const handleReserve = () => {
        if (vehicle_id) {
            navigate(`/car/${vehicle_id}`);
        }
    };
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm border-0 mt-5" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div id={carouselId} className="carousel slide" data-bs-ride="false" style={{ height: '200px' }}>
                    <div className="carousel-inner h-100">
                        {images && images.map((img, index) => (
                            <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                                <img
                                    src={img}
                                    className="d-block w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                    alt={brand}
                                />
                            </div>
                        ))}
                    </div>
                    {images?.length > 1 && (
                        <>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </>
                    )}
                </div>

                <div className="card-body d-flex flex-column p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold m-0 text-uppercase">{brand} {model}</h6>
                        <span className="badge bg-dark">{year || '2024'}</span>
                    </div>

                    <div className="d-flex gap-2 mb-3 text-muted" style={{ fontSize: '0.8rem' }}>
                        <span><i className="bi bi-gear"></i> {transmission}</span>
                        <span>•</span>
                        <span><i className="bi bi-palette"></i> {color}</span>
                    </div>

                    <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                        <div>
                            <span className="fw-bold h6 m-0">{price_per_day}</span>
                            <small className="text-muted"> Ft/nap</small>
                        </div>
                        <Gomb
                            buttonClass="btn btn-dark w-50"
                            content="Reserve"
                            onClick={handleReserve}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}