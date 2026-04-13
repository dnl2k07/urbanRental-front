import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card.jsx";

import urbanRentalLogo from "../assets/urbanRentalLogo.png";
import { getAllCarswithimg, filterCars } from "../users.js";

export default function Home() {
  const { user, onLogout } = useAuth();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("low_to_high");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load all cars on initial mount
  async function loadCars() {
    setLoading(true);
    const data = await getAllCarswithimg();

    if (data.error) {
      console.log("Error from API:", data.error);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setCars([]);
      setFilteredCars([]);
      setLoading(false);
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
    setFilteredCars(groupedCars);
    setLoading(false);
  }

  useEffect(() => {
    loadCars();
  }, []);

  // Apply filters to the cars
  async function applyFilters(e) {
    e.preventDefault();

    const filterData = {
      brand: brand.trim(),
      color: color.trim(),
      transmission: transmission.trim(),
      year: year.trim() ? parseInt(year, 10) : undefined,
      min_price: minPrice.trim() ? parseFloat(minPrice) : undefined,
      max_price: maxPrice.trim() ? parseFloat(maxPrice) : undefined,
      sort_order: sortOrder
    };

    // Remove empty values from filterData
    Object.keys(filterData).forEach(key => {
      if (filterData[key] === "" || filterData[key] === undefined) {
        delete filterData[key];
      }
    });

    const data = await filterCars(filterData);

    console.log("Filter API Response:", data);

    if (data.error) {
      console.log("Error from API:", data.error);
      return;
    }

    // Backend now always returns {message, result} with result as an array
    let filteredResults = Array.isArray(data.result) ? data.result : [];

    console.log("Filtered Results:", filteredResults);

    if (filteredResults.length === 0) {
      setFilteredCars([]);
      return;
    }

    // Group the filtered cars by vehicle_id
    const groupedCars = Object.values(
      filteredResults.reduce((acc, car) => {
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

    setFilteredCars(groupedCars);
  }

  // Reset filters
  function resetFilters() {
    setBrand("");
    setColor("");
    setTransmission("");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("low_to_high");
    
    // Reload all cars
    loadCars();
  }

  if (loading && cars.length === 0) {
    return (
      <div>
        <NavBar user={user} onLogout={onLogout}></NavBar>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar user={user} onLogout={onLogout}></NavBar>
      
      {/* Filter Section */}
      <div className="filter-section">
        <button 
          className="toggle-filters-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {isFilterOpen && (
          <form className="filters-form" onSubmit={applyFilters}>
            <div className="filter-row">
              {/* Brand Filter */}
              <div className="filter-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand..."
                />
              </div>

              {/* Color Filter */}
              <div className="filter-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Enter color..."
                />
              </div>

              {/* Transmission Filter */}
              <div className="filter-group">
                <label htmlFor="transmission">Transmission</label>
                <select
                  id="transmission"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="filter-group">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Enter year..."
                  min="1900"
                  max="2099"
                />
              </div>
            </div>

            <div className="filter-row">
              {/* Min Price Filter */}
              <div className="filter-group">
                <label htmlFor="minPrice">Min Price ($/day)</label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min price..."
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Max Price Filter */}
              <div className="filter-group">
                <label htmlFor="maxPrice">Max Price ($/day)</label>
                <input
                  type="number"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max price..."
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Sort Order */}
              <div className="filter-group">
                <label htmlFor="sortOrder">Sort by Price</label>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="low_to_high">Low to High</option>
                  <option value="high_to_low">High to Low</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button type="submit" className="apply-filters-btn">
                Apply Filters
              </button>
              <button 
                type="button" 
                className="reset-filters-btn"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Cars Grid */}
      <div className="row">
        {filteredCars.length === 0 ? (
          <p>No cars found</p>
        ) : (
          filteredCars.map((car) => (
            <Card
              key={`${car.vehicle_id}-${car.images[0]}`}
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
      <Footer />
    </div>
  );
}