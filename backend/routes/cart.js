const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});




router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json("Cart not found");

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});






router.post("/update", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json("Cart not found");

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});






// Get user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("items.productId");

    if (!cart) return res.json({ items: [], total: 0 });

    let total = 0;

    cart.items.forEach(item => {
      if (item.productId && item.productId.price) {
        total += item.productId.price * item.quantity;
      }
    });

    res.json({ cart, total });
  } catch (err) {
    res.status(500).json(err.message);
  }
});


module.exports = router;