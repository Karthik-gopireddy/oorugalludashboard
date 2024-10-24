
import React, { useState, useEffect } from 'react';
import url from '../../../url'; // Replace this with your base API URL


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editProduct, setEditProduct] = useState(null); // State for the product being edited
    const [showModal, setShowModal] = useState(false); // State for showing/hiding modal

    // Fetch products from the database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${url}/product/get-products`);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                console.log(data)
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (id) => {
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);

        try {
            const response = await fetch(`${url}/product/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
            setProducts((prevProducts) => [...prevProducts, products.find((product) => product._id === id)]);
        }
    };

    // Handle edit button click
    const handleEdit = (product) => {
        setEditProduct(product); // Set the product to be edited
        setShowModal(true); // Show the modal
    };

    // Handle form submission for editing product
    const handleUpdate = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('productName', editProduct.productName);
        formData.append('price', editProduct.price);
        formData.append('description', editProduct.description);
    
        console.log("Sending data:", {
            productName: editProduct.productName,
            price: editProduct.price,
            description: editProduct.description
        });
    
        try {
            const response = await fetch(`${url}/product/update-product/${editProduct._id}`, {
                method: 'PUT',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
    
            const updatedProduct = await response.json();
            console.log('Product updated successfully:', updatedProduct);
    
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct.product._id ? updatedProduct.product : product
                )
            );
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    };
    
    
    
    

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    // Show loading state
    if (loading) {
        return <p>Loading products...</p>;
    }

    // Show error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="product-table-container">
            <h2>Product List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>Rs: {product.price} /-</td>
                            <td>{product.description}</td>

                            <td>
                                <img
                                    src={`${url}/uploads/${product.image}`}
                                    alt={product.productName}
                                    className="product-image"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                                    Delete
                                </button>
                                <button onClick={() => handleEdit(product)} className="edit-btn">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            {/* Edit Modal */}
            {showModal && editProduct && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Product</h2>
                        <form onSubmit={handleUpdate}>
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="productName"
                                    value={editProduct.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={editProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    value={editProduct.description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            {/* <label>
                                Image:
                                <input type="file" name="image" />
                            </label> */}
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
