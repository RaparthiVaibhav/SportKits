import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import "../styles/productDetails.css";

const products = [
  { id: 1, name: "Football Jersey", description: "High-quality football jersey designed for match performance.", price: 49.99 },
  { id: 2, name: "Running Shoes", description: "Lightweight running shoes with superior grip and comfort.", price: 89.99 },
  { id: 3, name: "Sports Shorts", description: "Breathable shorts for high-intensity workouts.", price: 29.99 },
  { id: 4, name: "Training Cap", description: "Stylish cap for outdoor training.", price: 19.99 },
  { id: 5, name: "Basketball Jersey", description: "Sweat-wicking basketball jersey.", price: 54.99 },
  { id: 6, name: "Gym T-Shirt", description: "Comfort-fit t-shirt for gym sessions.", price: 24.99 },
  { id: 7, name: "Track Pants", description: "Flexible track pants for training.", price: 39.99 },
  { id: 8, name: "Sports Socks", description: "Cushioned socks for athletic comfort.", price: 14.99 },
  { id: 9, name: "Training Hoodie", description: "Warm hoodie for cold weather workouts.", price: 59.99 },
  { id: 10, name: "Sports Backpack", description: "Durable backpack with multiple compartments.", price: 44.99 },
  { id: 11, name: "Cricket Jersey", description: "Professional-grade cricket jersey.", price: 52.99 },
  { id: 12, name: "Cricket Bat", description: "Premium willow bat for power hitting.", price: 99.99 },
  { id: 13, name: "Cricket Gloves", description: "Protective gloves with padded grip.", price: 34.99 },
  { id: 14, name: "Cricket Helmet", description: "Safety helmet with metal grille.", price: 69.99 },
  { id: 15, name: "Football Boots", description: "Studded boots for firm ground.", price: 79.99 },
  { id: 16, name: "Goalkeeper Gloves", description: "High-grip gloves for goalkeepers.", price: 36.99 },
  { id: 17, name: "Basketball Shoes", description: "High-top shoes for ankle support.", price: 94.99 },
  { id: 18, name: "Compression Tights", description: "Muscle-support compression wear.", price: 27.99 },
  { id: 19, name: "Training Jacket", description: "Lightweight training jacket.", price: 64.99 },
  { id: 20, name: "Gym Bag", description: "Spacious gym bag with compartments.", price: 49.99 },
  { id: 21, name: "Yoga Mat", description: "Non-slip yoga mat.", price: 22.99 },
  { id: 22, name: "Resistance Bands", description: "Strength training resistance bands.", price: 18.99 },
  { id: 23, name: "Skipping Rope", description: "Speed rope for cardio.", price: 12.99 },
  { id: 24, name: "Sweatband Set", description: "Absorbent sweatbands.", price: 9.99 },
  { id: 25, name: "Sports Water Bottle", description: "BPA-free water bottle.", price: 16.99 },
  { id: 26, name: "Arm Sleeves", description: "UV-protection arm sleeves.", price: 14.99 },
  { id: 27, name: "Knee Support", description: "Elastic knee support brace.", price: 21.99 },
  { id: 28, name: "Ankle Support", description: "Compression ankle support.", price: 19.99 },
  { id: 29, name: "Foam Roller", description: "Muscle recovery foam roller.", price: 26.99 },
  { id: 30, name: "Training Cones Set", description: "Agility cones for drills.", price: 31.99 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  const relatedProducts = products.filter((p) => p.id !== Number(id));

  // 🔥 scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  }, [id]);

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="product-details">
      {/* MAIN PRODUCT */}
      <img src={`/images/products/${product.id}.jpg`} alt={product.name} />

      <h2>{product.name}</h2>
      <p className="description">{product.description}</p>
      <p className="price">${product.price}</p>

      <div className="qty-control">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => q + 1)}>+</button>
      </div>

      <div className="product-buttons">
        {showPopup && <div className="cart-popup">✅ Added to cart</div>}

        <button className="add-btns" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="buy-btns" onClick={() => navigate("/cart")}>
          Buy Now
        </button>
      </div>

      {/* RELATED PRODUCTS */}
      <h3 className="related-title">More Products</h3>

      <div className="related-grid">
        {relatedProducts.map((p) => (
          <div
            key={p.id}
            className="related-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={`/images/products/${p.id}.jpg`} alt={p.name} />
            <h4>{p.name}</h4>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
