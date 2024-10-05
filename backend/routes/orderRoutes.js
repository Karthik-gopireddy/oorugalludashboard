
const express = require("express");
const orderController = require("../controllers/ordersCollection");

const router = express.Router();

router.post("/create-order", orderController.createOrder);
router.get("/get-orders", orderController.getAllOrders);
router.delete('/delete-order/:id',orderController.deleteOrder )

module.exports = router;
