import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card.jsx";

import urbanRentalLogo from "../assets/urbanRentalLogo.png";
import { getAllCarswithimg } from "../users.js";
export default function Home() {
  const { user, onLogout } = useAuth();
  const [cars, setCars] = useState([]);

  async function loadCars() {
  const data = await getAllCarswithimg();

  if (data.error) {
    console.log("Error from API:", data.error);
    return;
  }

  if (!data || data.length === 0) {
    setCars([]);
    return;
  }

  const rawCars = data[0];

  const groupedCars = Object.values(
    rawCars.reduce((acc, car) => {
      if (!acc[car.vehicle_id]) {
        acc[car.vehicle_id] = {
          vehicle_id: car.vehicle_id,
          brand: car.brand,
          model: car.model,
          color: car.color,
          transmission: car.transmission,
          images: []
        };
      }

      if (car.img) {
        acc[car.vehicle_id].images.push(
          `http://localhost:3000/public/${car.img}`
        );
      }

      return acc;
    }, {})
  );

  setCars(groupedCars);
}

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div>
      <NavBar user={user} onLogout={onLogout}></NavBar>
      <div className="row">
        {cars.length === 0 ? (
          <p>no cars fuound sadly</p>
        ) : (
           cars.map((car) => (
             <Card
               key={`${car.vehicle_id}-${car.img}`}
               images={car.images}
               brand={car.brand}
               model={car.model}
               color={car.color}
               transmission={car.transmission}
               vehicle_id={car.vehicle_id}
             />
           ))
        )}
      </div>
    </div>
  );
}
