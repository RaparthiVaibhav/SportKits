import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getToken = () => localStorage.getItem("token");

  // ================= FETCH CART =================
  const fetchCart = async () => {
    const token = getToken();

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        }
      );

      const items = res.data.items || [];

      const formatted = items.map((item) => ({
        id: item.product?._id,
        name: item.product?.name,
        price: item.product?.price,
        image: item.product?.image || "/images/default.jpg",
        qty: item.quantity,
      }));

      setCart(formatted);

    } catch (err) {
      console.error("Cart fetch error:", err);
      setCart([]);
    }
  };

  // ================= LOAD CART ON LOGIN =================
  useEffect(() => {
    fetchCart();

    const handleLogin = () => {
      fetchCart();
    };

    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  // ================= ADD TO CART =================
const addToCart = async (product, quantity = 1) => {
  const token = getToken();

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/cart",
      {
        product: product._id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCart();

  } catch (err) {
    console.error("Add to cart error:", err);
  }
};

  // ================= REMOVE FROM CART =================
  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        }
      );

      fetchCart();

    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);