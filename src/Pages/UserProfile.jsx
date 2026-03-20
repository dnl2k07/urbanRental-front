import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { whoAmI, logout, newProfilePic } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
import Navbar from "../components/Navbar2"

export default function UserProfile() {
    const navigate = useNavigate()
    
    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const data = await whoAmI()
                console.log(data)
                if (!data.error) {
                    setUser(data)
                } else {
                    setUserError(data.error)
                }
            } catch (err) {
                setUserError("Failed to load user profile")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    async function failedLogin() {
        const data = await logout()
        if (data.error === "nincs cookie") {
            setUserError("Nincs aktív bejelentkezés!")
        }
    }

    async function onLogout() {
        const data = await logout()

        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        failedLogin()
        navigate('/')
    }

    // Profile image upload handler
    const handleImageUpload = async (e) => {
        e.preventDefault()
        
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setUserError("File size must be less than 5MB")
            return
        }

        setLoading(true)
        
        try {
            const formData = new FormData()
            formData.append('img', file)

            const data = await newProfilePic(user.user_id, formData)
            
            if (data.error) {
                setUserError(data.error)
            } else {
                setSuccess("Profile picture uploaded successfully!")
                
                // Refresh user data
                const updatedUser = await whoAmI()
                if (!updatedUser.error) {
                    setUser(updatedUser)
                }
                
                setTimeout(() => {
                    setSuccess(null)
                }, 3000)
            }
        } catch (err) {
            setUserError("Upload failed: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading && !user) return <div className="text-center mt-5">Loading...</div>

    return (
        <>
            <Navbar user={user} onLogout={onLogout} />
            <div className="container-fluid min-vh-100 pt-5 p-0" id="profileWindow">
                <div className="row g-0 h-100 align-items-center">
                    <div className="col-md-4 px-5 align-items-start">
                        <h1 className="nameDisplay">Hey, {user?.username || "not the user's name apperantely :("}!</h1>
                        <p className="question">Want to make your profile look like really you? <br/> You can make it here!</p>
                        
                        {/* Profile Image Upload */}
                        <div className="mt-4">
                            <h5>Profile Picture</h5>
                            
                            {userError && <div className="alert alert-danger">{userError}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            
                            {user?.profile_picture ? (
                                <img
                                    src={user.profile_picture.startsWith('http') 
                                        ? user.profile_picture 
                                        : `/public/${user.profile_picture}`}
                                    alt="Profile"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div className="border border-secondary rounded-circle d-flex align-items-center justify-content-center mb-3" 
                                     style={{
                                         width: '150px',
                                         height: '150px',
                                         backgroundColor: '#f0f0f0'
                                     }}>
                                    <span className="text-muted">No image</span>
                                </div>
                            )}
                            
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="file"
                                    id="profilePicInput"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={!user || loading}
                                    className="form-control mb-2"
                                />
                                
                                {user && (
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleImageUpload(e)
                                        }}
                                        type="button"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? 'Uploading...' : 'Upload New Picture'}
                                    </button>
                                )}
                            </form>
                        </div>
                        
                        {/* Profile Information */}
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

                    <div className="col-md-8 p-0 d-flex justify-content-end">
                        <img
                            src={backgroundPic}
                            alt="Background picture"
                            className="img-fluid"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}