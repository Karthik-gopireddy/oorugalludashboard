import React from 'react'

function Sidebar({AddProductstofirm,AllProductsList,AllCustomerOrders}) {
  return (
    <div className='sidebarsection'>
        <ul>
            <li onClick={AddProductstofirm}>Add-Products</li>
            <li onClick={AllProductsList}>All Products</li>
            <li onClick={AllCustomerOrders}>Customer Orders</li>
        </ul>
      
    </div>
  )
}

export default Sidebar
