import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from '../components/NavBar';
import defaultAvatarPhoto from '../assets/default-avatar-photo.jpg';
import Footer from "../components/Footer";
import {
    getUserProfile,
    uploadUserProfilePic,
    updateUserProfile,
    deleteUserProfilePic
} from "../users";

const DEFAULT_PROFILE_PIC = defaultAvatarPhoto;

export default function Profile() {
    const { user, setUser } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Form state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // File input state
    const [profilePic, setProfilePic] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            loadUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    async function loadUserProfile() {
        try {
            const data = await getUserProfile();
            if (data.error) {
                setError(data.error);
            } else {
                setProfileData(data);
                setUsername(data.username || '');
                setEmail(data.email || '');
                // If user has a profile image, use it; otherwise use default
                setPreviewImage(data.img || DEFAULT_PROFILE_PIC);
            }
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }
            
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size must be less than 2MB');
                return;
            }
            
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveProfilePic = async () => {
        if (!user?.user_id || !window.confirm('Are you sure you want to remove your profile picture?')) {
            return;
        }

        try {
            // For now, just clear the image since we don't have delete endpoint
            setPreviewImage(DEFAULT_PROFILE_PIC);
            setProfilePic(null);
            
            // Update local user state
            const updatedUser = { ...user, img: null };
            setUser(updatedUser);
        } catch (err) {
            setError('Failed to remove profile picture');
        }
    };

    const handleUpdateProfile = async () => {
        if (!user?.user_id) {
            setError('User not authenticated');
            return;
        }

        try {
            setLoading(true);
            
            // Update user info (username and email)
            const data = await updateUserProfile(user.user_id, username, email);
            
            if (data.error) {
                setError(data.error);
                return;
            }
            
            // Update local user state
            const updatedUser = { ...user, username, email };
            setUser(updatedUser);
            
            // If there's a new profile picture, upload it
            if (profilePic) {
                await handleUploadProfilePic();
            }
            
            setError('');
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUploadProfilePic = async () => {
        if (!user?.user_id || !profilePic) {
            setError('Please select a valid image file');
            return;
        }

        try {
            setUploading(true);
            
            // Upload new profile picture
            const data = await uploadUserProfilePic(user.user_id, profilePic);
            
            if (data.error) {
                setError(data.error);
                return;
            }
            
            // Refresh profile to get updated image URL
            const profileData = await getUserProfile();
            setPreviewImage(profileData.img || DEFAULT_PROFILE_PIC);
            
            // Update local user state with new image path
            const updatedUser = { ...user, img: profileData.img };
            setUser(updatedUser);
            
            setError('');
        } catch (err) {
            setError('Failed to upload profile picture');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <NavBar user={user} onLogout={() => setUser(null)} />
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <>
            <NavBar user={user} onLogout={() => setUser(null)} />
            <div className="container py-4">
                <h2 className="mb-4 text-center" style={{ color: '#333' }}>My Profile</h2>
                
                {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg className="flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}
                
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                {/* Profile Picture Section */}
                                <div className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={previewImage} 
                                            alt="Profile" 
                                            className="rounded-circle"
                                            style={{
                                                width: 120,
                                                height: 120,
                                                objectFit: 'cover',
                                                border: '4px solid #007bff'
                                            }}
                                        />
                                        <label className="position-absolute bottom-0 end-0 p-2 bg-primary rounded-circle shadow" 
                                               style={{ cursor: 'pointer', width: '35px', height: '35px', minWidth: '35px' }}
                                               title="Change profile picture">
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleFileChange}
                                                className="d-none"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                                <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm14 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-6 8v-3h3l4 4-4 4h-3v-3H9V7H5v3H2v2h3v5h5z"/>
                                            </svg>
                                        </label>
                                    </div>
                                    
                                    {profileData?.img && (
                                        <button 
                                            type="button" 
                                            className="btn btn-link text-danger mt-2"
                                            onClick={handleRemoveProfilePic}
                                            disabled={uploading}
                                        >
                                            Remove profile picture
                                        </button>
                                    )}
                                </div>

                                {/* User Information Form */}
                                <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label text-muted">
                                            Username
                                        </label>
                                        <input 
                                            type="text"
                                            id="username"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label text-muted">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-muted">
                                            New Password (optional)
                                        </label>
                                        <input 
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter a new password to change it"
                                        />
                                    </div>

                                    {uploading && (
                                        <div className="mb-3">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className="ms-2">Uploading profile picture...</span>
                                        </div>
                                    )}

                                    <button 
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 mb-2"
                                        disabled={loading || uploading}
                                    >
                                        {uploading ? 'Saving...' : 'Update Profile'}
                                    </button>
                                </form>

                                {/* User Details */}
                                <div className="mt-4 pt-3 border-top">
                                    <h6 className="text-muted mb-3">Account Information</h6>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">User ID:</div>
                                        <div className="col-sm-8">{user.user_id}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Role:</div>
                                        <div className="col-sm-8">
                                            <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-4 text-muted">Member Since:</div>
                                        <div className="col-sm-8">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}