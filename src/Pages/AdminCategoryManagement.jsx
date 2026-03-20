import { useState, useEffect } from "react";
import Navbar from "../components/Navbar2";

export default function AdminCategoryManagement() {
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // Form state
    const [form, setForm] = useState({
        category_name: '',
        description: ''
    });

    useEffect(() => {
        async function loadData() {
            try {
                // Check if user is logged in and is admin
                const userResponse = await fetch("http://localhost:3000/users/whoami", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    if (userData.role !== 'admin') {
                        setError("You don't have admin privileges");
                        return;
                    }
                    setUser(userData);
                } else {
                    setError("Please login as an administrator");
                    return;
                }

                // Load all categories
                const categoriesResponse = await fetch("http://localhost:3000/admin/allcategory", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (categoriesResponse.ok) {
                    const data = await categoriesResponse.json();
                    setCategories(Array.isArray(data.result) ? data.result : [data.result]);
                } else {
                    setError("Failed to load categories");
                }
            } catch (err) {
                setError("Network error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        
        loadData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3000/admin/newcategory", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(form)
            });
            
            if (response.ok) {
                setSuccess("Category added successfully");
                setError(null);
                
                // Reset form
                setForm({
                    category_name: '',
                    description: ''
                });
                
                // Reload categories
                const categoriesResponse = await fetch("http://localhost:3000/admin/allcategory", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (categoriesResponse.ok) {
                    const data = await categoriesResponse.json();
                    setCategories(Array.isArray(data.result) ? data.result : [data.result]);
                }
                
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError("Failed to add category");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    const deleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        
        try {
            const response = await fetch(`http://localhost:3000/admin/deletecategory/${categoryId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (response.ok) {
                setSuccess("Category deleted successfully");
                setError(null);
                
                // Remove the category from the list
                setCategories(prev => prev.filter(cat => cat.category_id !== categoryId));
                
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError("Failed to delete category");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <>
            <Navbar user={user} />
            <div className="container-fluid min-vh-100 pt-5 p-4">
                <div className="row mb-4">
                    <div className="col-md-8">
                        <h2>Category Management</h2>
                        <p>Create and manage car categories.</p>
                    </div>
                    <div className="col-md-4 text-end">
                        <button 
                            onClick={() => setError(null)}
                            className="btn btn-outline-secondary"
                        >
                            Clear Messages
                        </button>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="row">
                    {/* Add New Category Form */}
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Add New Category</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="category_name" className="form-label">Category Name</label>
                                        <input
                                            type="text"
                                            id="category_name"
                                            name="category_name"
                                            value={form.category_name}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="e.g., Economy, SUV, Luxury"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={form.description}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Describe this category..."
                                            rows="4"
                                        />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary w-100">
                                        Add Category
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="col-md-8 mb-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Existing Categories</h5>
                            </div>
                            <div className="card-body p-0">
                                {categories.length === 0 ? (
                                    <div className="text-center py-5">
                                        <h4>No categories found. Add one above!</h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Category Name</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map((cat) => (
                                                    <tr key={cat.category_id}>
                                                        <td>{cat.category_id}</td>
                                                        <td><strong>{cat.category_name || 'N/A'}</strong></td>
                                                        <td>{cat.description || '-'}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                title="Delete category"
                                                                onClick={() => deleteCategory(cat.category_id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
