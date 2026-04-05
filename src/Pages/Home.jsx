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
    console.log("API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);
      return;
    }

    if (!data || data.length === 0) {
      console.log("No cars returned");
      setCars([]);
      return;
    }
    console.log(data[0])
    setCars(data[0]);
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
              logo={`http://localhost:3000/public/${car.img}`}
              brand={car.brand}
              model={car.model}
              color={car.color}
              transmission={car.transmission}
            />
          ))
        )}
      </div>
    </div>
  );
}
