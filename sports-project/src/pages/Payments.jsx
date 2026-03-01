import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/payments.css";

const Payments = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async (method) => {
    try {
      setLoading(true);

      // Get cart from localStorage (make sure you're saving cart there)
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Calculate total amount
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const response = await fetch("http://localhost:5000/api/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalAmount,
          paymentMethod: method,
        }),
      });

      const data = await response.json();

      alert(data.message);

      // Clear cart after successful payment
      localStorage.removeItem("cart");

      navigate("/"); // redirect to home

    } catch (error) {
      alert("Payment Failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

        <button
          className="pay-btn"
          onClick={() => handlePayment("Card")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay with Card"}
        </button>

        <div className="divider">OR</div>

        {/* Wallet Options */}
        <p className="section-title">🛍️ Pay Using</p>

        <div className="wallet-options">
          <button
            className="wallet cod"
            onClick={() => handlePayment("Cash On Delivery")}
            disabled={loading}
          >
            Cash on Delivery
          </button>

          <button
            className="wallet phonepe"
            onClick={() => handlePayment("PhonePe")}
            disabled={loading}
          >
            PhonePe
          </button>

          <button
            className="wallet upi"
            onClick={() => handlePayment("UPI")}
            disabled={loading}
          >
            UPI
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payments;