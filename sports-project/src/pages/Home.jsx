import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

const heroImages = [
  "/images/hero/cricket.webp",
  "/images/hero/football.jpg",
  "/images/hero/hockey.jpg",
  "/images/hero/gym.avif",
];

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    setSearchValue(searchText);
  };

  const filteredProducts = products.filter((p) =>
    searchValue
      ? p.name.toLowerCase().includes(searchValue.toLowerCase())
      : true,
  );

  return (
    <div className="home">
      {/* HERO */}{" "}
      <section className="hero-slider">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hero"
            className={`hero-image ${index === currentSlide ? "active" : ""}`}
          />
        ))}
        ```
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
      {/* PRODUCTS */}
      <section className="home-products">
        <div className="home-grid">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="home-card"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image || "/images/default.jpg"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
