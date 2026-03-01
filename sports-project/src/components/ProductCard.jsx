import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    // If NOT logged in
    if (!token) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    // If logged in
    addToCart(props);
    alert("Product added to cart successfully!");
  };

  return (
    <div className="product-card">
      <img
        src={props.image}
        alt={props.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <h3>{props.name}</h3>
      <p>₹{props.price}</p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;