import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setProduct(found);

        const related = res.data
          .filter((p) => p._id !== id)
          .slice(0, 6);

        setRelatedProducts(related);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <h2>Loading product...</h2>;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // 🔴 Not logged in
    if (!token) {
      alert("Please login to add products to cart");
      navigate("/login");
      return;
    }

    // 🟢 Logged in
    await addToCart(product, qty);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="product-details">
      <img
        src={product.image || "/images/default.jpg"}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p className="description">
        {product.description || "High quality sports product."}
      </p>

      <p className="price">${product.price}</p>

      <div className="qty-control">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => q + 1)}>
          +
        </button>
      </div>

      <div className="product-buttons">
        {showPopup && (
          <div className="cart-popup">
            ✅ Added to cart
          </div>
        )}

        <button className="add-btns" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button
          className="buy-btns"
          onClick={() => navigate("/cart")}
        >
          Buy Now
        </button>
      </div>

      <h3 className="related-title">More Products</h3>

      <div className="related-grid">
        {relatedProducts.map((p) => (
          <div
            key={p._id}
            className="related-card"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img
              src={p.image || "/images/default.jpg"}
              alt={p.name}
            />
            <h4>{p.name}</h4>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;