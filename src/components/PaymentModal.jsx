import { useState } from "react";

export default function PaymentModal({ isOpen, onClose, amount, onProcessPayment }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cardName, setCardName] = useState("");
    const [cvc, setCvc] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onProcessPayment({
                cardNumber,
                expiryDate,
                cardName,
                cvc,
                amount
            });

            onClose();
        } catch (error) {
            console.error("Payment error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Payment Details</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    placeholder="****-****-****-1234"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardName"
                                    placeholder="CARDHOLDER NAME"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cvc" className="form-label">CVC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cvc"
                                    placeholder="***"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="alert alert-info">
                                <strong>Amount to Pay:</strong> ${amount.toFixed(2)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}