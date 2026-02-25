const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/products", require("./routes/productRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});