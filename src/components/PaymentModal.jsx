import { useState } from "react";

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  onProcessPayment,
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  // Validate expiry date
  const isValidExpiry = (dateStr) => {
    if (!dateStr || !/\d{2}\/\d{2}/.test(dateStr)) return false;
    const [month, year] = dateStr.split("/");
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12) return false;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum < currentMonth) return false;

    return true;
  };

  // Validate CVC (must be exactly 3 digits)
  const validateCvc = (value) => {
    return /^\d{3}$/.test(value);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(cardNumber);
    
    const rawCardNumber = cardNumber.replace(/\s/g, "");

    if (rawCardNumber.length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return;
    }

    if (!isValidExpiry(expiryDate)) {
      alert("Please enter a valid expiry date (MM/YY format)");
      return;
    }

    if (cardName.trim().length < 2) {
      alert("Please enter your name");
      return;
    }

    if (!validateCvc(cvc)) {
      alert("Please enter a valid CVC (3 digits)");
      return;
    }

    setLoading(true);

    try {
      await onProcessPayment({
        cardNumber,
        expiryDate,
        cardName,
        cvc,
        amount,
      });

      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"

    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Payment Details</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control form-yellow-input"
                  id="cardNumber"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control form-yellow-input"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  className="form-control form-yellow-input"
                  id="cardName"
                  placeholder="CARDHOLDER NAME"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvc" className="form-label">
                  CVC
                </label>
                <input
                  type="text"
                  className="form-control form-yellow-input"
                  id="cvc"
                  placeholder="***"
                  value={cvc}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setCvc(val);
                  }}
                  maxLength={3}
                  required
                />
              </div>
              <div className="alert alert-info">
                <strong>Amount to Pay:</strong> ${amount.toFixed(2)}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
