export default function FAQ() {
    return (
        <div className="container py-5">
            <h1 className="mb-4 fw-bold">Frequently Asked Questions</h1>
            
            <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button 
                            className="accordion-button" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                        >
                            How do I book a car?
                        </button>
                    </h2>
                    <div 
                        id="collapseOne" 
                        className="accordion-collapse collapse show" 
                        aria-labelledby="headingOne" 
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            You can book a car by browsing our available vehicles, selecting your preferred car and rental dates, and completing the checkout process. You'll need to create an account or log in to complete your booking.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo" 
                            aria-expanded="false" 
                            aria-controls="collapseTwo"
                        >
                            What documents do I need?
                        </button>
                    </h2>
                    <div 
                        id="collapseTwo" 
                        className="accordion-collapse collapse" 
                        aria-labelledby="headingTwo" 
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            You'll need a valid driver's license, a government-issued ID or passport, and a credit card for the security deposit. Your driver's license must be valid for the entire rental period.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree" 
                            aria-expanded="false" 
                            aria-controls="collapseThree"
                        >
                            What is your cancellation policy?
                        </button>
                    </h2>
                    <div 
                        id="collapseThree" 
                        className="accordion-collapse collapse" 
                        aria-labelledby="headingThree" 
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            You can cancel your reservation for a full refund up to 24 hours before the scheduled pickup time. Cancellations within 24 hours may be subject to a fee.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseFour" 
                            aria-expanded="false" 
                            aria-controls="collapseFour"
                        >
                            Do you offer unlimited mileage?
                        </button>
                    </h2>
                    <div 
                        id="collapseFour" 
                        className="accordion-collapse collapse" 
                        aria-labelledby="headingFour" 
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Yes, all our rental packages include unlimited mileage. You can drive as much as you need without additional charges.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button 
                            className="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseFive" 
                            aria-expanded="false" 
                            aria-controls="collapseFive"
                        >
                            What if I have an accident?
                        </button>
                    </h2>
                    <div 
                        id="collapseFive" 
                        className="accordion-collapse collapse" 
                        aria-labelledby="headingFive" 
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            In case of an accident, please contact local authorities first, then notify us immediately at support@urbanrental.com. Do not admit fault or make repairs without our approval.
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
    );
}