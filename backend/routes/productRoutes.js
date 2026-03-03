const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

// PROTECTED ROUTES
router.post("/", verifyToken, productController.createProduct);
router.put("/:id", verifyToken, productController.updateProduct);
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;