import { useState } from "react";

const handleCarsUpload = (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
  
    if (files.length > 5) {
      alert("You can upload maximum 5 cars");
      return;
    }
  
    console.log(files); // all uploaded images
};

export default function CarUpload() {
    const [cars, setCars] = useState([]);
  
    const handleCarsUpload = (e) => {
      const files = Array.from(e.target.files);
  
      if (files.length > 5) {
        alert("Max 5 images allowed");
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