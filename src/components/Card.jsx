import logo from '../pics/urbanRentalLogo.png';

const BACKEND_URL = 'http://localhost:3000'; // Or your deployed backend

export default function Card({ car }) {
    const imageUrl = car.img ? `${BACKEND_URL}/${car.img}` : logo;

    return (
        <div className="card bg-dark text-white my-3" style={{ width: "18rem" }}>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={imageUrl} alt="Car pictures" />
                    </div>
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={imageUrl} alt="Car pictures" />
                    </div>
                </div>

            </div>
            <div className="card-img-overlay carousel-item active">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Szín: {car.color}</p>
                <p className="card-text"><small>Évjárat: {car.year}</small></p>
                <p className="card-text"><small>Ár: {car.price_per_day} Ft/nap</small></p>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

    );
}
