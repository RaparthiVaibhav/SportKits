import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // 🔐 check login using token
  const token = localStorage.getItem("token");

  // 🛒 get cart from context
  const { cart } = useCart();

  // 🔢 total items count
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        SportKits
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* 🛒 CART WITH COUNT */}
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        {token ? (
          <>
            {/* 👤 account logo */}
            <img
              src="/images/logo.png"
              alt="Account"
              className="account-logo-nav"
              onClick={() => navigate("/account")}
            />

            <span className="logout-btn" onClick={handleLogout}>
              
            </span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;