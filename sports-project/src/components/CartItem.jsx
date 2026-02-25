import React from "react";

const CartItem = ({ item }) => {
  const product = item.productId;

  return (
    <div className="cart-item">
      <div>
        <h4>{product?.name}</h4>
        <p>${product?.price}</p>
        <p>Qty: {item.quantity}</p>
      </div>

      <button>Remove</button>
    </div>
  );
};

export default CartItem;