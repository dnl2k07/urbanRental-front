import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext"

export default function FAQ() {
    const { user, onLogout } = useAuth()
    return (
    /* A d-flex és min-vh-100 kényszeríti az oldalt, hogy kitöltse a képernyőt */
    <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={onLogout} />
        
        {/* A flex-grow-1 kitölti az üres helyet, így lefelé tolja a Footert */}
        <div className="container py-5 mt-5 flex-grow-1">
            <h1 className="mb-4 fw-bold">Frequently Asked Questions</h1>
            
            <div className="accordion" id="faqAccordion">
                {/* 1. Kérdés */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button 
                            className="accordion-button shadow-none"  
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                            style={{ backgroundColor: '#e4b44c', color: '#000000' }}
                        >
                            How do I book a car?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You can book a car by browsing our available vehicles, selecting your preferred car and rental dates, and completing the checkout process. You'll need to create an account or log in to complete your booking.
                        </div>
                    </div>
                </div>

                {/* 2. Kérdés */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                            What documents do I need?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You'll need a valid driver's license, a government-issued ID or passport, and a credit card for the security deposit.
                        </div>
                    </div>
                </div>

                {/* 3. Kérdés */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                            What is your cancellation policy?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You can cancel your reservation for a full refund up to 24 hours before the scheduled pickup time.
                        </div>
                    </div>
                </div>

                {/* 4. Kérdés */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                            Do you offer unlimited mileage?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            Yes, all our rental packages include unlimited mileage.
                        </div>
                    </div>
                </div>

                {/* 5. Kérdés */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                            What if I have an accident?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            In case of an accident, please contact local authorities first, then notify us immediately at support@urbanrental.com.
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center">
                <p className="text-muted mb-3">Still have questions?</p>
                <a href="mailto:support@urbanrental.com" className="btn btn-primary px-4">
                    Contact Support
                </a>
            </div>
        </div>

        {/* Ez most már fixen az oldal legalján lesz */}
        <Footer />
    </div>
);
    
}