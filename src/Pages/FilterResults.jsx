import { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar2";

export default function FilterResults() {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    // Filter form state
    const [filters, setFilters] = useState({
        brand: '',
        color: '',
        transmission: '',
        year_from: '',
        year_to: '',
        price_from: '',
        price_to: ''
    });

    useEffect(() => {
        async function loadData() {
            try {
                // Check if user is logged in
                const userResponse = await fetch("http://localhost:3000/users/whoami", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                }
                
                // Load all cars
                const carsResponse = await fetch("http://localhost:3000/users/cars", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (carsResponse.ok) {
                    const data = await carsResponse.json();
                    let carsData = Array.isArray(data) ? data : (data.result || []);
                    
                    setCars(carsData);
                    setFilteredCars(carsData);
                } else {
                    setError("Failed to load cars");
                }
            } catch (err) {
                setError("Network error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Prepare filter object
            const filterObject = {};
            
            if (filters.brand) filterObject.brand = filters.brand;
            if (filters.color) filterObject.color = filters.color;
            if (filters.transmission) filterObject.transmission = filters.transmission;
            if (filters.year_from) filterObject.year_from = parseInt(filters.year_from);
            if (filters.year_to) filterObject.year_to = parseInt(filters.year_to);
            if (filters.price_from) filterObject.price_from = parseInt(filters.price_from);
            if (filters.price_to) filterObject.price_to = parseInt(filters.price_to);

            // Send POST request with filters
            const response = await fetch("http://localhost:3000/users/filter", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(filterObject)
            });
            
            if (response.ok) {
                const data = await response.json();
                let filteredData = Array.isArray(data) ? data : (data.result || []);
                setFilteredCars(filteredData);
                
                // If no results, show a message
                if (filteredData.length === 0 && Object.values(filters).some(v => v)) {
                    setError("No cars found matching your filters");
                }
            } else {
                setError("Failed to apply filters");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setFilters({
            brand: '',
            color: '',
            transmission: '',
            year_from: '',
            year_to: '',
            price_from: '',
            price_to: ''
        });
        setFilteredCars(cars); // Reset to all cars
    };

    if (loading && cars.length === 0) return <div className="text-center mt-5"><div className="loading-spinner"></div></div>;

    const brands = [...new Set(cars.map(car => car.brand).filter(Boolean))];
    const colors = [...new Set(cars.map(car => car.color).filter(Boolean))];
    const transmissions = [...new Set(cars.map(car => car.transmission).filter(Boolean))];

    return (
        <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <>
                <Navbar user={user} />
                <div className="container-fluid min-vh-100 pt-5 p-4">
                    <div className="row justify-content-center">
                        {/* Filter Sidebar */}
                        <div className={`col-md-3 mb-4 ${isVisible ? 'animate-fade-in-left' : ''}`}>
                            <div className="card shadow-sm border-0 sticky-top animate-scale-in" style={{ top: '80px' }}>
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Filters</h5>
                                </div>
                                <div className="card-body">
                                    {/* Brand Filter */}
                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">Brand</label>
                                        <select
                                            id="brand"
                                            name="brand"
                                            value={filters.brand}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="">All Brands</option>
                                            {brands.map(brand => (
                                                <option key={brand} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Color Filter */}
                                    <div className="mb-3">
                                        <label htmlFor="color" className="form-label">Color</label>
                                        <select
                                            id="color"
                                            name="color"
                                            value={filters.color}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="">All Colors</option>
                                            {colors.map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Transmission Filter */}
                                    <div className="mb-3">
                                        <label htmlFor="transmission" className="form-label">Transmission</label>
                                        <select
                                            id="transmission"
                                            name="transmission"
                                            value={filters.transmission}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            <option value="">All Transmissions</option>
                                            {transmissions.map(trans => (
                                                <option key={trans} value={trans}>{trans}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Year Range */}
                                    <div className="mb-3">
                                        <label className="form-label">Year Range</label>
                                        <div className="input-group">
                                            <span className="input-group-text">From</span>
                                            <input
                                                type="number"
                                                name="year_from"
                                                value={filters.year_from}
                                                onChange={handleFilterChange}
                                                className="form-control"
                                                placeholder="e.g. 2018"
                                            />
                                            <span className="input-group-text">To</span>
                                            <input
                                                type="number"
                                                name="year_to"
                                                value={filters.year_to}
                                                onChange={handleFilterChange}
                                                className="form-control"
                                                placeholder="e.g. 2023"
                                            />
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="mb-3">
                                        <label className="form-label">Price Range (HUF/day)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">From</span>
                                            <input
                                                type="number"
                                                name="price_from"
                                                value={filters.price_from}
                                                onChange={handleFilterChange}
                                                className="form-control"
                                                placeholder="e.g. 10000"
                                            />
                                            <span className="input-group-text">To</span>
                                            <input
                                                type="number"
                                                name="price_to"
                                                value={filters.price_to}
                                                onChange={handleFilterChange}
                                                className="form-control"
                                                placeholder="e.g. 50000"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <button 
                                        onClick={applyFilters}
                                        className="btn btn-primary w-100 mb-2 animate-scale-in"
                                    >
                                        Apply Filters
                                    </button>
                                    <button 
                                        onClick={clearFilters}
                                        className="btn btn-outline-secondary w-100 animate-scale-in"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className={`col-md-9 ${isVisible ? 'animate-fade-in-right' : ''}`}>
                            <h3 className="mb-4 animate-pulse-custom">Cars matching your criteria</h3>
                            
                            {error && <div className="alert alert-warning animate-fade-in">{error}</div>}
                            
                            <div className="row g-4 overflow-auto" style={{ maxHeight: '85vh' }}>
                                {filteredCars.length > 0 ? (
                                    filteredCars.map(car => (
                                        <div key={car.vehicle_id} className="col-12 col-lg-6 col-xl-4 animate-fade-in-up">
                                            <Card car={car} />
                                        </div>
                                    ))
                                ) : (
                                    !error && (
                                        <div className="text-center mt-5">
                                            <h3>No cars found. Try adjusting your filters!</h3>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}
