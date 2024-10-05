import React, { useState } from 'react';
import url from "../../../url"


const AddProductPage = () => {

    const [formData, setFormData] = useState({
        productName: '',
        price:0,
        description: '',
        image: null
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0] // Grabbing the first file uploaded
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('price', Number(formData.price)); // Ensure price is a number
        data.append('description', formData.description);
        data.append('image', formData.image);
    
        // Log the form data
        console.log("Form Data:", {
            productName: formData.productName,
            price: formData.price,
            description: formData.description,
            image: formData.image ? formData.image.name : null
        });
    
        try {
            const response = await fetch(`${url}/product/add-products`, {
                method: 'POST',
                body: data, // Send FormData directly without JSON.stringify
            });
    
            console.log("Response:", response);
    
            if (response.ok) {
                const result = await response.json();
                alert('Product added successfully!');
                setFormData({
                    productName: '',
                    price: 0,
                    description: '',
                    image: null,
                });
            } else {
                const errorData = await response.json();
                console.error("Error Data:", errorData);
                alert('Failed to add product: ' + errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Server error.');
        }
    };
    


    return (
        <div className="add-firm-container">
            <h2>Add Products</h2>
            <form onSubmit={handleSubmit} className="add-firm-form">
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        placeholder="Enter Product Name"
                        value={formData.productName} // Set the value from the formData state
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter Price"
                        value={formData.price} // Set the value from the formData state
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter the Text"
                        value={formData.description} // Set the value from the formData state
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submit-btn">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;