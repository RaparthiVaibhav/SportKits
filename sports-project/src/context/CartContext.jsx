import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setCart([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );

      const items = res.data.cart?.items || [];

      const formatted = items.map((item) => ({
        id: item.productId?._id,
        name: item.productId?.name,
        price: item.productId?.price,
        qty: item.quantity,
      }));

      setCart(formatted);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    await axios.post("http://localhost:5000/api/cart/add", {
      userId,
      productId: product._id,
      quantity: 1,
    });

    fetchCart();
  };

  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    await axios.post("http://localhost:5000/api/cart/remove", {
      userId,
      productId,
    });

    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);