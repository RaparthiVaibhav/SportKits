const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { verifyToken } = require("../middleware/authMiddleware");

// Protect all cart routes
router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.delete("/:productId", verifyToken, removeFromCart);
router.delete("/", verifyToken, clearCart);

module.exports = router;