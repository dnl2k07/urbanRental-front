import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

export default function AdminUserManagement() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        async function loadUser() {
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

                // Load all users
                const usersResponse = await fetch("http://localhost:3000/admin/alluser", {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (usersResponse.ok) {
                    const data = await usersResponse.json();
                    setUsers(Array.isArray(data.result) ? data.result : [data.result]);
                } else {
                    setError("Failed to load users");
                }
            } catch (err) {
                setError("Network error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        
        loadUser();
    }, []);

    const banUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/deleteoneuser/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (response.ok) {
                setSuccess("User has been banned successfully");
                setError(null);
                
                // Remove the user from the list
                setUsers(prev => prev.filter(user => user.user_id !== userId));
                
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError("Failed to ban user");
            }
        } catch (err) {
            setError("Network error: " + err.message);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user permanently?")) return;
        
        try {
            // For permanent deletion, you might need a different endpoint
            // This is just an example - adjust based on your backend implementation
            const response = await fetch(`http://localhost:3000/admin/deleteoneuser/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (response.ok) {
                setSuccess("User has been deleted permanently");
                setError(null);
                
                // Remove the user from the list
                setUsers(prev => prev.filter(user => user.user_id !== userId));
                
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError("Failed to delete user");
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
                        <h2>User Management</h2>
                        <p>View and manage all users in the system.</p>
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

                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        {users.length === 0 ? (
                            <div className="text-center py-5">
                                <h4>No users found in the system</h4>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Registered</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.user_id}>
                                                <td>{user.user_id}</td>
                                                <td>{user.username || 'N/A'}</td>
                                                <td>{user.email || 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        user.role === 'admin' ? 'bg-danger' : 'bg-primary'
                                                    }`}>
                                                        {user.role || 'user'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {user.created_at 
                                                        ? new Date(user.created_at).toLocaleDateString() 
                                                        : 'N/A'}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-danger me-2"
                                                        title="Ban user"
                                                        onClick={() => banUser(user.user_id)}
                                                        disabled={user.user_id === user?.user_id}
                                                    >
                                                        Ban
                                                    </button>
                                                    {/* Add more actions as needed */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        <p className="text-muted small">
                            * Admin accounts cannot be banned/deleted
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
