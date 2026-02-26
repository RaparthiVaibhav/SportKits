import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        {" "}
        <h2>Your cart is empty 🛒</h2>{" "}
      </div>
    );
  }

  const handleBuyAll = () => {
    navigate("/payments");
  };

  return (
    <div className="cart-page">
      {" "}
      <h2>Your Cart ({totalItems} items)</h2>
      
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.image || "/images/default.jpg"}
            alt={item.name}
            className="cart-image"
          />

          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>Quantity: {item.qty}</p>
            <p>Price: ${(item.price * item.qty).toFixed(2)}</p>

            <div className="cart-item-buttons">
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

              <button
                className="buy-now-btn"
                onClick={() => navigate("/payments")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button className="buy-all-btn" onClick={handleBuyAll}>
          Buy Entire Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
