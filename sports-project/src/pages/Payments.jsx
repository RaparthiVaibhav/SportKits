import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/payments.css";

const Payments = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const handlePayment = async (method) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      // Calculate total
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );

      const response = await fetch(
        "http://localhost:5000/api/payment/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            totalAmount,
            paymentMethod: method,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate("/order-success");
      } else {
        alert("Payment Failed");
      }

    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>Secure Payment</h2>

      <div className="payment-box">

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