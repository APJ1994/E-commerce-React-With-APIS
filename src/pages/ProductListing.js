import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductListing = () => {

  const[getProducts,setGetProducts]=useState([])

  const {categoryId}=useParams();

  const getProductListing=(async()=>{
    try{
      const res=await axios.get(`http://localhost/myecomm/MyApi/categoryByProducts/${categoryId}`);
      setGetProducts(res.data);
    }
    catch(err){
console.error('Error',err)
    }
  })

  useEffect(()=>{
getProductListing();
  },[categoryId])
  return (
    <div>
     {/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
// ...
require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/}
{/* {"PRoducts" + JSON.stringify(getProducts.data)} */}

<div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Heaidng</h2>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {getProducts.data && getProducts.data.map((products)=>{
            return(
              <>
      <div className="group relative" key={products.product_id}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men's Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/productdetails/${products.product_id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {products.product_name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
      

          <p className="text-sm font-medium text-gray-900">${products.product_price}</p>
         
        </div>
      </div>
       
      </>
            )
          })}
        </div>
      
      {/* More products... */}
    
             
    
    </div>
</div>
</div>

  )
}

export default ProductListing