import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Replace later with logged-in user
  const userId = "699d950b304ce3c3879820c5";

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);

      const items = res.data.cart?.items || [];

    const formatted = items.map(item => ({
  id: item.productId?._id,
  name: item.productId?.name,
  price: item.productId?.price,
  image: item.productId?.image || "/images/default.jpg",
  qty: item.quantity,
}));

      setCart(formatted);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
  const load = async () => {
    await fetchCart();
  };

  load();
}, []);

  const addToCart = async (product, qty = 1) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id,
        quantity: qty,
      });

      fetchCart();
    } catch (err) {
      console.error("Add cart error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        userId,
        productId,
      });

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
