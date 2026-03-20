import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { whoAmI, logout } from "../usersFolder/users"
import backgroundPic from "../pics/BackgroundPic.png"
import Navbar from "../components/Navbar2"

export default function AdminPage() {
    const navigate = useNavigate()
    const [car, setCar] = useState({
        category_id: "",
        brand: "",
        model: "",
        color: "",
        transmission: "",
        license_plate: "",
        year: "",
        price_per_day: ""
    });
    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    const [uploadMsg, setUploadMsg] = useState(null)

    useEffect(() => {
        async function load() {
            const data = await whoAmI()
            if (!data.error) {
                setUser(data)
            } else {
                setUserError(data.error)
            }
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setUserError(data.error)
        }
        setUser(null)
        navigate('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadMsg(null);

    const formData = new FormData();
    Object.keys(car).forEach(key => formData.append(key, car[key]));

    const files = e.currentTarget.querySelector('input[name="img"]').files;
    for (let i = 0; i < files.length; i++) {
        formData.append("img", files[i]);
    }

    try {
        const response = await fetch('http://localhost:3000/admin/carwithimgupload', {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const text = await response.text();
        console.log("RAW RESPONSE:", text);
        console.log("STATUS:", response.status);

        let result;
        try { 
            result = JSON.parse(text); 
        } catch {
            result = { error: text };
        }

        if (response.ok) {
            setUploadMsg(`✅ Sikeres feltöltés!`);
            setCar({
                category_id: "",
                brand: "",
                model: "",
                color: "",
                transmission: "",
                license_plate: "",
                year: "",
                price_per_day: ""
            });
            e.target.reset();
        } else {
            setUploadMsg(`❌ Hiba: ${result.error || 'Ismeretlen hiba'}`);
        }
    } catch (err) {
        setUploadMsg(`❌ Hálózati hiba: ${err.message}`);
    }
};

    return (
        <div className="logoutErrorBox">
            <Navbar user={user} onLogout={onLogout} />
            <div className="container-fluid min-vh-100 pt-5 p-0" id="mainWindow">
                <div className="row g-0 h-100 align-items-center">
                    <div className="col-md-4 px-5">
                        <div className="car-box">
                            <p>New car</p>
                            {/* XD 
                            <div class="tooltip-container">
                                <span class="text">Tooltip</span>
                                <span class="tooltip">Uiverse.io</span>
                            </div>
                            XD */}
                            <form onSubmit={handleSubmit}>
                                <div className="admin-box">
                                    <input type="number" name="category_id" value={car.category_id} onChange={handleChange} required />
                                    <label>Car category ID</label>
                                </div>
                                <div className="admin-box">
                                    <input type="text" name="brand" value={car.brand} onChange={handleChange} required />
                                    <label>Car brand</label>
                                </div>
                                <div className="admin-box">
                                    <input type="text" name="model" value={car.model} onChange={handleChange} required />
                                    <label>Car model</label>
                                </div>
                                <div className="admin-box">
                                    <input type="text" name="color" value={car.color} onChange={handleChange} required />
                                    <label>Car color</label>
                                </div>
                                <div className="admin-box">
                                    <input type="text" name="transmission" value={car.transmission} onChange={handleChange} required />
                                    <label>Transmission</label>
                                </div>
                                <div className="admin-box">
                                    <input type="text" name="license_plate" value={car.license_plate} onChange={handleChange} required />
                                    <label>License plate</label>
                                </div>
                                <div className="admin-box">
                                    <input type="number" name="year" value={car.year} onChange={handleChange} required />
                                    <label>Year</label>
                                </div>
                                <div className="admin-box">
                                    <input type="number" name="price_per_day" value={car.price_per_day} onChange={handleChange} required />
                                    <label>Price per day</label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upload car pictures</label>
                                    <input type="file" className="form-control" name="img" accept="image/*" multiple />
                                </div>
                                <button type="submit" className="btn btn-secondary w-100">
                                    Upload new car
                                </button>
                            </form>
                            {uploadMsg && <div className="alert alert-info mt-3">{uploadMsg}</div>}
                        </div>
                    </div>

                    <div className="col-md-8 p-0 d-flex justify-content-end">
                        <img
                            src={backgroundPic}
                            alt="Background picture"
                            className="img-fluid"
                            style={{
                                width: '90%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>

                </div>
            </div>
            {userError && <div className="alert alert-danger text-center my-2 w-25 h-25 m-5">{userError}</div>}
        </div>
    )
}