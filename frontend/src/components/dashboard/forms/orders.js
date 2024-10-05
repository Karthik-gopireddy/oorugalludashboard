import React, { useState, useEffect } from 'react';
import url from '../../../url'; // Replace this with your base API URL

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Fetch customer orders from the database
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${url}/orders/get-orders`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Delete an order
    const handleDelete = async (orderId) => {
        try {
            const response = await fetch(`${url}/orders/delete-order/${orderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            // Update the orders state to remove the deleted order
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            setError(error.message);
        }
    };

    // Show loading state
    if (loading) {
        return <p>Loading orders...</p>;
    }

    // Show error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

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
        <div className="order-table-container">
            <h2>Customer Orders</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Product Image</th>
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.fullName}</td>
                            <td>{order.mobile},<br />{order.email}</td>
                            <td>{order.address},<br />{order.city},<br />{order.state},<br />{order.pinCode}</td>
                            <td>
                                {order.products.map((product, index) => (
                                    <div key={product.productId}>
                                        {index + 1}. {product.productName} (Qty: {product.quantity})<br/><br/>
                                    </div> 
                                ))}
                            </td>
                            <td>${order.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</td>
                            <td>
                                {order.products.map(product => (
                                    <img
                                        key={product.productId}
                                        src={`${url}/uploads/${product.image}`}
                                        alt={product.productName}
                                        className="product-image"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                ))}
                            </td>
                            <td>
                                <button className='deletebuttoninOrders' onClick={() => handleDelete(order._id)}>Delete</button> {/* Delete button */}
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
        </div>
    );
};

export default CustomerOrders;
