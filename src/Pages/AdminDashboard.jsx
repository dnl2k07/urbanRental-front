import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch("http://localhost:3000/users/whoami", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    if (userData.role !== 'admin') {
                        setError("You don't have admin privileges");
                        setTimeout(() => navigate("/"), 2000);
                    } else {
                        setUser(userData);
                    }
                } else {
                    setError("Please login as an administrator");
                    setTimeout(() => navigate("/login"), 2000);
                }
            } catch (err) {
                setError("Network error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        
        loadUser();
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

    const stats = [
        { title: "Total Cars", value: "0", color: "bg-primary" },
        { title: "Active Reservations", value: "0", color: "bg-warning text-dark" },
        { title: "Total Users", value: "0", color: "bg-info text-dark" },
        { title: "Pending Actions", value: "0", color: "bg-danger" }
    ];

    return (
        <>
            <Navbar user={user} />
            <div className="container-fluid min-vh-100 pt-5 p-4">
                <div className="row mb-4">
                    <div className="col-md-8">
                        <h2>Admin Dashboard</h2>
                        <p>Welcome, {user?.username}. Manage your system from here.</p>
                    </div>
                    <div className="col-md-4 text-end">
                        <button 
                            onClick={() => navigate('/admin/users')}
                            className="btn btn-outline-primary me-2"
                        >
                            Users
                        </button>
                        <button 
                            onClick={() => navigate('/admin/categories')}
                            className="btn btn-outline-success me-2"
                        >
                            Categories
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-md-3 col-sm-6">
                            <div className={`card ${stat.color} text-white shadow-sm h-100`}>
                                <div className="card-body">
                                    <h5 className="card-title">{stat.title}</h5>
                                    <p className="display-4 mb-0">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="row mb-4">
                    <h3>Quick Actions</h3>
                    <div className="col-md-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="row g-3 text-center">
                                    <div className="col-md-3 col-sm-6">
                                        <button 
                                            onClick={() => navigate('/admin/users')}
                                            className="btn btn-outline-primary w-100 py-3"
                                        >
                                            Manage Users
                                        </button>
                                        <p className="mt-2 small text-muted">View, edit or ban users</p>
                                    </div>
                                    
                                    <div className="col-md-3 col-sm-6">
                                        <button 
                                            onClick={() => navigate('/admin/categories')}
                                            className="btn btn-outline-success w-100 py-3"
                                        >
                                            Manage Categories
                                        </button>
                                        <p className="mt-2 small text-muted">Add or edit car categories</p>
                                    </div>
                                    
                                    <div className="col-md-3 col-sm-6">
                                        <a href="/admin" className="btn btn-outline-secondary w-100 py-3">
                                            View Reservations
                                        </a>
                                        <p className="mt-2 small text-muted">Review all reservations</p>
                                    </div>
                                    
                                    <div className="col-md-3 col-sm-6">
                                        <a href="/admin" className="btn btn-outline-info w-100 py-3">
                                            View Rentals
                                        </a>
                                        <p className="mt-2 small text-muted">Track active rentals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="row mb-4">
                    <h3>Recent Activity</h3>
                    <div className="col-md-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <p className="text-center text-muted">Activity log will be displayed here</p>
                                {/* This would show recent reservations, user actions, etc. */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Car Upload - Quick Access */}
                <div className="row">
                    <h3>Quick Car Upload</h3>
                    <div className="col-md-12">
                        <form 
                            id="quickCarUploadForm"
                            action="http://localhost:3000/admin/carwithimgupload" 
                            method="POST"
                            encType="multipart/form-data"
                        >
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-4 col-sm-6">
                                            <input 
                                                type="text" 
                                                name="brand" 
                                                placeholder="Brand (e.g. Tesla)" 
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <input 
                                                type="text" 
                                                name="model" 
                                                placeholder="Model (e.g. Model 3)" 
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2 col-sm-6">
                                            <input 
                                                type="number" 
                                                name="price_per_day" 
                                                placeholder="Price/day (HUF)" 
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2 col-sm-6">
                                            <input 
                                                type="file" 
                                                name="img" 
                                                accept="image/*" 
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary w-100 py-2"
                                            form="quickCarUploadForm"
                                        >
                                            Add New Car
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
