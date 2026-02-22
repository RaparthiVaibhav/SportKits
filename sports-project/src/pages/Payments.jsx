import { useNavigate } from "react-router-dom";
import "../styles/payments.css";

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="payments-page">

      {/* 🔙 BACK BUTTON */}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>Secure Payment</h2>

      <div className="payment-box">

        {/* Card Payment */}
        <p className="section-title">💳 Card Details</p>

        <input type="text" placeholder="Card Holder Name" />
        <input type="text" placeholder="Card Number" />

        <div className="row">
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="CVV" />
        </div>

        <button className="pay-btn">
          Pay with Card
        </button>

        <div className="divider">OR</div>

        {/* Wallet / Other Options */}
        <p className="section-title">🛍️ Pay Using</p>

        <div className="wallet-options">
          <button className="wallet cod">
            Cash on Delivery
          </button>

          <button className="wallet phonepe">
            PhonePe
          </button>

          <button className="wallet upi">
            UPI
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payments;
