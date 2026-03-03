import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // You can add validation here later

    navigate("/Payments"); // 🔥 redirect to payments page
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="Phone Number" required />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;