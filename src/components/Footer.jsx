import urbanRentalLogo from '../assets/urbanRentalLogo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row">
                    {/* Company Info Section */}
                    <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                        <img
                            src={urbanRentalLogo}
                            alt="Urban Rental Logo"
                            style={{ height: '60px', width: '180px' }}
                            className="mb-3"
                        />
                        <p className="text-white-50 small">
                            Your trusted urban car rental solution. We provide reliable, stylish vehicles for all your city travel needs.
                        </p>
                        
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-2 col-lg-2 mb-4 mb-md-0">
                        <h5 className="text-white mb-4 fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white-50 hover-white text-decoration-none small">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/login" className="text-white-50 hover-white text-decoration-none small">Login</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/register" className="text-white-50 hover-white text-decoration-none small">Register</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/myreservations" className="text-white-50 hover-white text-decoration-none small">My Reservations</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="col-md-3 col-lg-3 mb-4 mb-md-0">
                        <h5 className="text-white mb-4 fw-bold">Support</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/faq" className="text-white-50 hover-white text-decoration-none small">FAQ</Link>
                            </li>
                            <li className="mb-2">
                                <a href="mailto:support@urbanrental.com" className="text-white-50 hover-white text-decoration-none small">Contact Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white-50 hover-white text-decoration-none small">Privacy Policy</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-white-50 hover-white text-decoration-none small">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div className="col-md-3 col-lg-4 mb-0">
                        <h5 className="text-white mb-4 fw-bold">Contact Us</h5>
                        <div className="d-flex align-items-start gap-2 mb-3">
                            
                            <span className="text-white-50 small">info@urbanrental.com</span>
                        </div>
                        <div className="d-flex align-items-start gap-2 mb-3">
                            
                            <span className="text-white-50 small">+1 (555) 123-4567</span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                            
                            <span className="text-white-50 small">123 Urban Street, City Center</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-top border-secondary pt-4 mt-4 text-center">
                    <p className="mb-0 text-white-50 small">
                        &copy; {currentYear} Urban Rental. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}