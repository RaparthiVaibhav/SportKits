const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = new Product({
      name,
      price,
      image,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});



router.post("/bulk", async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: "Bulk insert failed" });
  }
});

module.exports = router;