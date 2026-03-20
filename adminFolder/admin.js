import { useState } from "react";

const handleCarsUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length > 10) {
      alert("You can upload maximum 10 cars");
      return;
    }
};

export default function CarUpload() {
    const [cars, setCars] = useState([]);
  
    const handleCarsUpload = (e) => {
      const files = Array.from(e.target.files);
  
      if (files.length > 10) {
        alert("Max 10 images allowed");
        return;
      }
  
      setCars(files);
    };
  
    return (
      <div>
        <input type="file" accept="image/*" multiple onChange={handleCarsUpload} />
  
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {cars.map((car, index) => (
            <img
              key={index}
              src={URL.createObjectURL(car)}
              alt="car"
              width="120"
            />
          ))}
        </div>
      </div>
    );
  }