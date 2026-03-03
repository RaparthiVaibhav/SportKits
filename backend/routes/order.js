const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

// PROTECTED
router.post("/", verifyToken, orderController.createOrder);
router.get("/", verifyToken, orderController.getAllOrders);
router.get("/:id", verifyToken, orderController.getSingleOrder);
router.put("/:id", verifyToken, orderController.updateOrder);
router.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = router;