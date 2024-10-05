import React, { useState } from 'react'
import Sidebar from '../Sidebar'

import AddProductPage from '../../../components/dashboard/forms/AddProductPage'
import AllProducts from '../../../components/dashboard/forms/AllProducts'
import CustomerOrders from '../forms/orders'

function LandingPage() {

  const [addProduct,setAddProduct]=useState(false)
  const [allProducts,setAllProducts]=useState(false)
  const [customerorder,setCustomerOrder]=useState(false)


  
  const AddProductstofirm=()=>{
    setAddProduct(true)
    setAllProducts(false)
    setCustomerOrder(false)
  }


  const AllProductsList=()=>{
    setAllProducts(true)
    setAddProduct(false)
    setCustomerOrder(false)
  }

  const AllCustomerOrders=()=>{
    setCustomerOrder(true)
    setAllProducts(false)
    setAddProduct(false)
  }



  return (
    <div>
      {/* <Navbar registeration={registeration} LoginNav={LoginNav}  /> */}
      <div className='routercontainer'>
        <Sidebar AllCustomerOrders={AllCustomerOrders} AddProductstofirm={AddProductstofirm} AllProductsList={AllProductsList} />

        {addProduct&& <AddProductPage />}
        {allProducts&& <AllProducts />}
        {customerorder&& <CustomerOrders />}
      </div>


    </div>
  )
}

export default LandingPage
