import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <div>
        <h4>{item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button>Remove</button>
    </div>
  );
};

export default CartItem;
