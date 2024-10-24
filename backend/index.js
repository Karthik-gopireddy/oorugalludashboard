// const express = require("express")
// const dotEnv = require("dotenv")
// const bodyParser = require("body-parser")
// const mongoose = require("mongoose")
// const vendorRoutes = require("./routes/vendorRoutes")
// const path = require("path")
// const cors = require("cors");
// const productRoutes = require("./routes/productRoutes")
// // const orderRoute=require("./routes/orderRoutes")

// // const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// const multer = require('multer');
// // const upload = multer({ dest: 'uploads/' });

// const Product = require('./models/Product');

// const app = express()

// const PORT = process.env.PORT || 4000
// dotEnv.config()
// app.use(bodyParser.json())




// app.use(cors());

// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log("MongoDB connected successfully!")
//     })
//     .catch((error) => {
//         console.log(`Error: ${error}`)
//     })

    

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// app.use("/vendor", vendorRoutes)
// app.use("/product", productRoutes)


// // app.use("/api/products", productRoutes);
// app.use("/orders", orderRoutes);
// // app.use("/order", orderRoute)

// // Set the destination for uploads

// // Configure multer to handle file uploads

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Ensure this directory exists
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Avoid file name collisions
//     },
// });
// const upload = multer({ storage: storage });

// // Your update route
// app.put('/product/update-product/:id', upload.none(), async (req, res) => {
//     console.log("Request body:", req.body); // Log the request body

//     try {
//         const { productName, price, description } = req.body;

//         // Fetch the existing product from the database
//         const existingProduct = await Product.findById(req.params.id);

//         if (!existingProduct) {
//             return res.status(404).send('Product not found');
//         }

//         // Update only the fields that are provided
//         const updatedProductData = {
//             productName: productName || existingProduct.productName,
//             price: price || existingProduct.price,
//             description: description || existingProduct.description,
//             image: existingProduct.image, // Retain the existing image
//         };

//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });

//         res.json({ product: updatedProduct });
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).send('Server error');
//     }
// });





// app.listen(PORT, () => {
//     console.log(`server is running on Port: ${PORT}`)
// })


const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const path = require("path");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const multer = require("multer");
const Product = require("./models/Product");

const app = express();

const PORT = process.env.PORT || 4000;
dotEnv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

// Serve the 'uploads' folder to access uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/vendor", vendorRoutes);
app.use("/product", productRoutes);
app.use("/orders", orderRoutes);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/")); // Save uploaded files in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Ensure unique file names
  },
});

const upload = multer({ storage: storage });

// Product Update Route
app.put("/product/update-product/:id", upload.single("image"), async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  console.log("Uploaded file:", req.file); // Log the uploaded file (image)

  try {
    const { productName, price, description } = req.body;

    // Fetch the existing product from the database
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).send("Product not found");
    }

    // Update only the fields that are provided
    const updatedProductData = {
      productName: productName || existingProduct.productName,
      price: price || existingProduct.price,
      description: description || existingProduct.description,
      image: req.file ? req.file.filename : existingProduct.image, // Update image if a new one is uploaded
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });

    res.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

