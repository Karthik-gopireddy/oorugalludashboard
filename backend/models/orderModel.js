// models/Order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            validate: {
              validator: mongoose.Types.ObjectId.isValid,
              message: 'Invalid productId',
            },
          },
          productName: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        }
      ],
      totalAmount: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now }
    });
  

module.exports = mongoose.model("Order", orderSchema);
