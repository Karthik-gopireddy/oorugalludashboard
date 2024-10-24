const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
// const Firm = require("../models/Firm");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const addProduct = async (req, res) => {
    try {
        const { productName, price, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;  // Store the full path
        
        if (!productName || !price) {
            return res.status(400).json({ error: 'Product name and price are required.' });
        }

        const product = new Product({ productName, price, description, image });
        const savedProduct = await product.save();

        return res.status(201).json({ message: "Product created successfully!", product: savedProduct });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};





// const updateProductById = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const { productName, price, description } = req.body;
//         console.log(req.body)
//         const image = req.file ? req.file.filename : undefined;

//         const updatedProduct = await Product.findByIdAndUpdate(
//             productId,
//             {
//                 productName,
//                 price,
//                 description,
//                 ...(image && { image }), // If a new image is uploaded, update it
//             },
//             { new: true } // Return the updated document
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };




const getAllProducts = async (req, res) => {

  
    try {
        const products = await Product.find(); // Fetch all products from the database
        return res.status(200).json(products); // Send the products in response
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Server error" });
    }
};



const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;  // Assuming the product ID is passed as a URL parameter.

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return the product data
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};



const deleteProductById= async(req,res)=>{
    try {
        const productId=req.params.productId;

        const deletedProduct=await Product.findByIdAndDelete(productId)

        if(!deletedProduct){
            return res.status(404).json({error:"No Product found!"})
        }
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Server error" });
        
        
    }
}




module.exports = { addProduct: [upload.single("image"),addProduct],getProductById,deleteProductById,getAllProducts };
