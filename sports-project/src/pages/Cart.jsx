import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to access cart");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {Array.isArray(cart) && cart.length === 0 && (
        <p>No items in cart</p>
      )}

      {Array.isArray(cart) &&
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p>Quantity: {item.qty}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default Cart;