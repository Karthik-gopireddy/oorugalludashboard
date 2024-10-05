// controllers/ordersCollection.js

const Order = require('../models/orderModel');

// controllers/ordersCollection.js

const createOrder = async (req, res) => {
    try {
        console.log('Order request body:', JSON.stringify(req.body, null, 2)); // Log full request body
        const order = new Order(req.body); // Attempt to create an order
        await order.save(); // Save the order to the database
        res.status(201).json({message:"Order successfully added"}); // Send back the created order
    } catch (error) {
        console.error('Error creating order:', error); // Log the error for debugging
        res.status(400).json({ message: error.message }); // Return error message to client
    }
};


  
  

// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Server error" });
    }
};



const deleteOrder= async (req, res) => {
    const { id } = req.params;

    try {
        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndDelete(id);

        // Check if the order was found and deleted
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, getAllOrders,deleteOrder };
