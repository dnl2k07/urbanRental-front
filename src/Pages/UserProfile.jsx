import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/NavBar"
import { newProfilePic } from "../usersFolder/users"

export default function UserProfile() {
    const navigate = useNavigate()
    const { user, loading, onLogout, setUser } = useAuth()
    const fileInputRef = useRef(null);
    const [userError, setUserError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50);
    }, [])

    // Kép feltöltés kezelése
    const handleImageUpload = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }

        const file = fileInputRef.current?.files[0];
        if (!file) {
            setUserError("Nincs kiválasztva fájl!");
            return;
        }

        try {
            setIsUploading(true);
            setUserError(null);

            const formData = new FormData();
            formData.append('img', file);

            const data = await newProfilePic(user.user_id, formData);

            if (data.error) {
                setUserError(data.error);
            } else {
                setSuccess("Profilkép sikeresen feltöltve!");
                if (data.profile_picture) {
                    // ELMENTJÜK LOCALSTORAGE-BA, hogy F5 után is ott legyen
                    localStorage.setItem(`user_pfp_${user.user_id}`, data.profile_picture);
                    setUser({ ...user, profile_picture: data.profile_picture });
                }
            }
        } catch (err) {
            setUserError("Hiba a feltöltés során: " + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    if (loading && !user) return <div className="text-center mt-5"><div className="loading-spinner"></div></div>

    // MEGNÉZZÜK VAN-E MENTETT KÉP, HA A BACKEND NEM KÜLDI
    const displayPfp = user?.profile_picture || localStorage.getItem(`user_pfp_${user?.user_id}`);

    return (
        <>
            <div className={`page-transition-wrapper ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <Navbar user={user} onLogout={onLogout} />
                <div className="container-fluid min-vh-100 pt-5 p-0 align-content-center" id="profileWindow">
                    <div className="row g-0 h-100 align-items-center justify-content-center">
                        <div className={`col-md-4 px-5 align-items-start p-3 ${isVisible ? 'animate-fade-in-left' : ''}`} style={{ backgroundColor: '#e7dcdc' }}>
                            <div className="mt-4 text-center">
                                <h5>Profile Picture</h5>
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
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Email:</strong> {user?.email || 'N/A'}</li>
                                    <li className="list-group-item"><strong>Username:</strong> {user?.username || 'N/A'}</li>
                                    <li className="list-group-item">
                                        <strong>Role:</strong>
                                        <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user?.role || 'user'}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}