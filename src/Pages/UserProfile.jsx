import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"

export default function UserProfile() {
    const navigate = useNavigate()
    const { user, loading, onLogout, setUser, updateUserData } = useAuth()
    const fileInputRef = useRef(null);
    const [userError, setUserError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, [])

    //User chanes thingies
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users/edituser/${user?.user_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (res.ok) {
                alert('A profilod frissült! A változások érvényesítéséhez kérjük, jelentkezz be újra.');
                onLogout();
                navigate('/login');
            } else {
                setMessage('Hiba történt!');
            }
        } catch (err) {
            setMessage('Szerver hiba!');
        }
    };

    if (loading && !user) return <div className="text-center mt-5"><div className="loading-spinner"></div></div>

    return (
        <>
            <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <Navbar user={user} onLogout={onLogout} />
                <div className="container-fluid min-vh-100 pt-5 p-0 align-content-center" id="profileWindow">
                    <div className="row g-0 h-100 align-items-center justify-content-center">

                        {/* Left side */}
                        <div className={`col-md-4 px-5 align-items-start p-3 ${isVisible ? 'animate-fade-in-left' : ''}`} style={{ backgroundColor: '#eeeeee', borderRadius: '15px 0 0 15px' }}>
                            <div className="mt-4 text-center">
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={`https://ui-avatars.com/api/${user?.username || 'User'}&background=random&color=fff`}
                                        alt="Profile"
                                        className="img-fluid rounded-circle mb-3"
                                        style={{ width: '150px', height: '150px', border: '3px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5>Profile Information</h5>
                                <ul className="list-group list-group-flush shadow-sm rounded">
                                    <li className="list-group-item bg-transparent"><strong>Email:</strong> {user?.email || 'N/A'}</li>
                                    <li className="list-group-item bg-transparent"><strong>Username:</strong> {user?.username || 'N/A'}</li>
                                    <li className="list-group-item bg-transparent">
                                        <strong>Role:</strong>{" "}
                                        <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user?.role || 'user'}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Rigth side */}
                        <div className={`col-md-4 p-5 bg-white shadow-lg p3 ${isVisible ? 'animate-fade-in-right' : ''}`} style={{ borderRadius: '0 15px 15px 0' }}>
                            <h4 className="mb-4 text-center">Settings</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted">New Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        style={{ backgroundColor: '#f8f9fa' }}
                                        placeholder="Leave empty to keep current"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted">New Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        style={{ backgroundColor: '#f8f9fa' }}
                                        placeholder="Leave empty to keep current"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        style={{ backgroundColor: '#f8f9fa' }}
                                        placeholder="Leave empty to keep current"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark btn-lg w-100 shadow-sm py-3 mb-3" style={{ borderRadius: '10px' }}>
                                    Save Changes
                                </button>
                            </form>
                            {message && (
                                <div className={`alert ${message.includes('Sikeres') ? 'alert-success' : 'alert-danger'} text-center py-2 animate-bounce`}>
                                    {message}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}