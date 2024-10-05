const express = require("express")

const productController = require("../controllers/productControllers")

const router = express.Router()

router.post("/add-products", productController.addProduct)
// router.get("/:firmId/products", productController.getProductByFirm)
router.get("/get/:get-productById",productController.getProductById)


router.get("uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});




// router.put("/update-product/:productId", productController.updateProductById);


router.get('/get-products',productController.getAllProducts);

router.delete("/:productId",productController.deleteProductById);

module.exports = router