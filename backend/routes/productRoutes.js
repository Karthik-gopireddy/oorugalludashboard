const express = require("express");
const path = require("path"); // Import path for serving static files
const productController = require("../controllers/productControllers");

const router = express.Router();

// Route to add products
router.post("/add-products", productController.addProduct);

// Route to get a specific product by ID
router.get("/get/:get-productById", productController.getProductById);

// Route to serve uploaded images
router.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(404).send("Image not found");
        }
    });
});

// Route to get all products
router.get('/get-products', productController.getAllProducts);

// Route to delete a product by ID
router.delete("/:productId", productController.deleteProductById);

module.exports = router;
