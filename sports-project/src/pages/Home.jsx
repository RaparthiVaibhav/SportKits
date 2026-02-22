import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

/* 🔥 HERO IMAGES */
const heroImages = [
  "/images/hero/cricket.webp",
  "/images/hero/football.jpg",
  "/images/hero/hockey.jpg",
  "/images/hero/gym.avif",
];

const products = [
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
  { id: 30, name: "Training Cones Set", price: 31.99, category: "football" },
];

const Home = () => {
  const navigate = useNavigate();

  /* 🔥 SLIDER STATE */
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [searchText, setSearchText] = useState(
    localStorage.getItem("homeSearch") || ""
  );
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("homeSearch") || ""
  );
  const [category, setCategory] = useState(null);

  const handleSearch = () => {
    setSearchValue(searchText);
    localStorage.setItem("homeSearch", searchText);
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = category ? p.category === category : true;
    const matchSearch = searchValue
      ? p.name.toLowerCase().includes(searchValue.toLowerCase())
      : true;
    return matchCategory && matchSearch;
  });

  return (
    <div className="home">
      
      {/* 🔥 HERO SLIDER */}
      <section className="hero-slider">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hero"
            className={`hero-image ${
              index === currentSlide ? "active" : ""
            }`}
          />
        ))}

        <div className="hero-content">
          <h1>Buy Your Favorite Sports Kits</h1>
          <p>Premium quality kits for every sport</p>

          <div className="home-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="features">
        <div className="feature" onClick={() => setCategory("football")}>
          ⚽ Football Kits
        </div>
        <div className="feature" onClick={() => setCategory("cricket")}>
          🏏 Cricket Kits
        </div>
        <div className="feature" onClick={() => setCategory("basketball")}>
          🏀 Basketball Kits
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="home-products">
        {filteredProducts.length === 0 && (
          <p className="no-results">No products found</p>
        )}

        <div className="home-grid">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="home-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img src={`/images/products/${p.id}.jpg`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
