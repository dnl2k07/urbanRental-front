import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext"

export default function Legal() {
    const { user, onLogout } = useAuth()
    return (
        <div className="container py-5 mt-5">
            <Navbar user={user} onLogout={onLogout} />
            <h1 className="mb-4 fw-bold">Legal Information</h1>
            
            {/* Privacy Policy Section */}
            <section className="mb-5">
                <h2 className="h4 fw-bold mb-3 border-bottom pb-2">Privacy Policy</h2>
                <div className="accordion" id="privacyAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="privacyOne">
                            <button 
                                className="accordion-button" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#privacyCollapseOne" 
                                aria-expanded="true"
                            >
                                What information do we collect?
                            </button>
                        </h2>
                        <div 
                            id="privacyCollapseOne" 
                            className="accordion-collapse collapse show" 
                            aria-labelledby="privacyOne" 
                            data-bs-parent="#privacyAccordion"
                        >
                            <div className="accordion-body">
                                We collect information you provide directly when using our services, including your name, email address, phone number, driver's license information, and payment details.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="privacyTwo">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#privacyCollapseTwo" 
                                aria-expanded="false"
                            >
                                How do we use your information?
                            </button>
                        </h2>
                        <div 
                            id="privacyCollapseTwo" 
                            className="accordion-collapse collapse" 
                            aria-labelledby="privacyTwo" 
                            data-bs-parent="#privacyAccordion"
                        >
                            <div className="accordion-body">
                                We use the information we collect to process your reservations, verify your identity, communicate with you, and improve our services.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="privacyThree">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#privacyCollapseThree" 
                                aria-expanded="false"
                            >
                                Do we share your information?
                            </button>
                        </h2>
                        <div 
                            id="privacyCollapseThree" 
                            className="accordion-collapse collapse" 
                            aria-labelledby="privacyThree" 
                            data-bs-parent="#privacyAccordion"
                        >
                            <div className="accordion-body">
                                We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as payment processors and identity verification services.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms of Service Section */}
            <section className="mb-5">
                <h2 className="h4 fw-bold mb-3 border-bottom pb-2">Terms of Service</h2>
                <div className="accordion" id="termsAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="termsOne">
                            <button 
                                className="accordion-button" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#termsCollapseOne" 
                                aria-expanded="true"
                            >
                                Acceptance of Terms
                            </button>
                        </h2>
                        <div 
                            id="termsCollapseOne" 
                            className="accordion-collapse collapse show" 
                            aria-labelledby="termsOne" 
                            data-bs-parent="#termsAccordion"
                        >
                            <div className="accordion-body">
                                By accessing and using Urban Rental services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you may not use our services.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="termsTwo">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#termsCollapseTwo" 
                                aria-expanded="false"
                            >
                                User Responsibilities
                            </button>
                        </h2>
                        <div 
                            id="termsCollapseTwo" 
                            className="accordion-collapse collapse" 
                            aria-labelledby="termsTwo" 
                            data-bs-parent="#termsAccordion"
                        >
                            <div className="accordion-body">
                                As a user, you are responsible for maintaining the confidentiality of your account information, providing accurate and complete information during registration, and complying with all applicable traffic laws while using our vehicles.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="termsThree">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#termsCollapseThree" 
                                aria-expanded="false"
                            >
                                Rental Agreements
                            </button>
                        </h2>
                        <div 
                            id="termsCollapseThree" 
                            className="accordion-collapse collapse" 
                            aria-labelledby="termsThree" 
                            data-bs-parent="#termsAccordion"
                        >
                            <div className="accordion-body">
                                All rentals are subject to the terms and conditions displayed at the time of booking. You agree to review and accept these terms before completing your reservation. We reserve the right to refuse service to any customer for any legal reason.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="termsFour">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#termsCollapseFour" 
                                aria-expanded="false"
                            >
                                Limitation of Liability
                            </button>
                        </h2>
                        <div 
                            id="termsCollapseFour" 
                            className="accordion-collapse collapse" 
                            aria-labelledby="termsFour" 
                            data-bs-parent="#termsAccordion"
                        >
                            <div className="accordion-body">
                                Urban Rental shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our liability shall be limited to the amount paid by you for the specific rental giving rise to the claim.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-5 text-center">
                <p className="text-muted mb-3">Have questions about our legal policies?</p>
                <a href="mailto:support@urbanrental.com" className="btn btn-primary px-4">
                    Contact Us
                </a>
            </div>
            <Footer></Footer>
        </div>
    );
}