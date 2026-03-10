import { Link } from "react-router-dom";
import backgroundPic from '../pics/BackgroundPic.png'
import Navbar from "./NavBar";

export default function MainPageBody({ user, onLogout }) {
    return (
        <>
            <div className="container-fluid min-vh-100 pt-5 p-0" id="mainWindow">
                <div className="row g-0 h-100 align-items-center">
                    
                    <div className="col-md-4 px-5">
                        <h1 className="display-4">Hey, {user?.username || 'Tester'}!</h1>
                        <p className="lead">Welcome to Urban Rentals.</p>
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