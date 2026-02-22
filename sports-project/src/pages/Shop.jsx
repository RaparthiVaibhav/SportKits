import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

const products = [
  { id: 1, name: "Football Jersey", price: 49.99, category: "football" },
  { id: 2, name: "Running Shoes", price: 89.99, category: "football" },
  { id: 3, name: "Sports Shorts", price: 29.99, category: "football" },
  { id: 4, name: "Training Cap", price: 19.99, category: "football" },
  { id: 5, name: "Basketball Jersey", price: 54.99, category: "basketball" },
  { id: 6, name: "Gym T-Shirt", price: 24.99, category: "football" },
  { id: 7, name: "Track Pants", price: 39.99, category: "football" },
  { id: 8, name: "Sports Socks", price: 14.99, category: "football" },
  { id: 9, name: "Training Hoodie", price: 59.99, category: "basketball" },
  { id: 10, name: "Sports Backpack", price: 44.99, category: "football" },
  { id: 11, name: "Cricket Jersey", price: 52.99, category: "cricket" },
  { id: 12, name: "Cricket Bat", price: 99.99, category: "cricket" },
  { id: 13, name: "Cricket Gloves", price: 34.99, category: "cricket" },
  { id: 14, name: "Cricket Helmet", price: 69.99, category: "cricket" },
  { id: 15, name: "Football Boots", price: 79.99, category: "football" },
  { id: 16, name: "Goalkeeper Gloves", price: 36.99, category: "football" },
  { id: 17, name: "Basketball Shoes", price: 94.99, category: "basketball" },
  { id: 18, name: "Compression Tights", price: 27.99, category: "fitness" },
  { id: 19, name: "Training Jacket", price: 64.99, category: "fitness" },
  { id: 20, name: "Gym Bag", price: 49.99, category: "fitness" },
  { id: 21, name: "Yoga Mat", price: 22.99, category: "fitness" },
  { id: 22, name: "Resistance Bands", price: 18.99, category: "fitness" },
  { id: 23, name: "Skipping Rope", price: 12.99, category: "fitness" },
  { id: 24, name: "Sweatband Set", price: 9.99, category: "fitness" },
  { id: 25, name: "Sports Water Bottle", price: 16.99, category: "fitness" },
  { id: 26, name: "Arm Sleeves", price: 14.99, category: "fitness" },
  { id: 27, name: "Knee Support", price: 21.99, category: "fitness" },
  { id: 28, name: "Ankle Support", price: 19.99, category: "fitness" },
  { id: 29, name: "Foam Roller", price: 26.99, category: "fitness" },
  { id: 30, name: "Training Cones Set", price: 31.99, category: "football" },
];

const Shop = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState(
    localStorage.getItem("shopSearch") || ""
  );
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("shopSearch") || ""
  );

  const [addedId, setAddedId] = useState(null);

  // 🔥 quantity per product (keyed by product id)
  const [qtyMap, setQtyMap] = useState({});

  const handleSearch = () => {
    setSearchValue(searchText);
    localStorage.setItem("shopSearch", searchText);
  };

  const handleQtyChange = (id, delta) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = qtyMap[product.id] || 1;
    addToCart(product, qty);

    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredProducts = products.filter((p) =>
    searchValue
      ? p.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  return (
    <div className="shop-page">
      
     
      <h2 className="shop-title">All Products</h2>


       <div className="shop-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search-btns" onClick={handleSearch}>
          🔍
        </button>
      </div>


      <div className="shop-grid">
        {filteredProducts.map((product) => {
          const qty = qtyMap[product.id] || 1;

          return (
            <div key={product.id} className="shop-card">
              <img
                src={`/images/products/${product.id}.jpg`}
                alt={product.name}
                className="shop-image"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>

              {/* QUANTITY */}
              <div className="qty-controls">
                <button onClick={() => handleQtyChange(product.id, -1)}>−</button>
                <span>{qty}</span>
                <button onClick={() => handleQtyChange(product.id, 1)}>+</button>
              </div>

              {/* BUTTONS */}
              <div className="shop-buttons">
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                {addedId === product.id && (
                  <div className="cart-popups">✅ Added to cart</div>
                )}

                <button
                  className="buy-btn"
                  onClick={() => {
                    addToCart(product, qty);
                    navigate("/payments");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
