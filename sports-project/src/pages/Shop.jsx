import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "../styles/shop.css";

const Shop = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [qtyMap, setQtyMap] = useState({});

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    setSearchValue(searchText);
  };

  const handleQtyChange = (id, delta) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = qtyMap[product._id] || 1;
    addToCart(product, qty);
  };

  const filteredProducts = products.filter((p) =>
    searchValue
      ? p.name.toLowerCase().includes(searchValue.toLowerCase())
      : true,
  );

  return (
    <div className="shop-page">
      {" "}
      <h2 className="shop-title">All Products</h2>
      ```
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
          const qty = qtyMap[product._id] || 1;

          return (
            <div key={product._id} className="shop-card">
              <img
                src={product.image || "/images/default.jpg"}
                alt={product.name}
                className="shop-image"
                onClick={() => navigate(`/product/${product._id}`)}
              />

              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>

              <div className="qty-controls">
                <button onClick={() => handleQtyChange(product._id, -1)}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => handleQtyChange(product._id, 1)}>
                  +
                </button>
              </div>

              <div className="shop-buttons">
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-btn"
                  onClick={() => {
                    handleAddToCart(product);
                    navigate("/cart");
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
