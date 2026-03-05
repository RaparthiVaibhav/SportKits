const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ================= PROCESS PAYMENT =================
exports.processPayment = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🔥 Simulated payment logic
    if (paymentMethod === "Card") {
      console.log("Processing card payment...");
    }

    if (paymentMethod === "Cash On Delivery") {
      console.log("Processing COD...");
    }

    // ✅ Save Order
    const order = new Order({
      user: req.user._id,
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.qty, // IMPORTANT
      })),
      totalAmount,
      paymentMethod,
      paymentStatus: "Completed",
    });

    await order.save();

    // ✅ Clear Cart in DB
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.json({
      success: true,
      message: "Payment Successful! Order Placed 🎉",
    });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Payment Failed" });
  }
};