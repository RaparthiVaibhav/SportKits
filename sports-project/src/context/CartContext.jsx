import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const userId = "699d950b304ce3c3879820c5"; // your test user

  // Load cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
  const loadCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  loadCart();
}, []);

  // Add item
  const addToCart = async (product, qty = 1) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id || product.id,
        quantity: qty,
      });

      await fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        userId,
        productId,
      });

      await fetchCart();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  // Clear cart (optional later)
  const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};