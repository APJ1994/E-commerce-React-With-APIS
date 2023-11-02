import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import QuantityComponent from '../components/QuantityComponent'
import { CartContext } from '../CartContext'


export const ProductDetails = () => {
    const[productDetails,setProductDetails]=useState([])

    const {cart,setCart}=useContext(CartContext);

    const addToCart=(event,productDetails)=>{
      event.preventDefault();

      let _cart={...cart};
      if(!_cart.items){
        _cart.items={};
      }
      if(_cart.items[productDetails.product_id])
      {
        _cart.items[productDetails.product_id] += 1;
      }
      else{
        _cart.items[productDetails.product_id] = 1;
      }

      if(!_cart.totalItems){
        _cart.totalItems=0;
      }

      _cart.totalItems += 1;
      setCart(_cart);



    }

    const {productId}=useParams();

    const getProductDetails=(async()=>{
        try{
        const res=await axios.get(`http://localhost/myecomm/MyApi/detailProducts/${productId}`)
        setProductDetails(res.data);
        }
        catch(error){
            console.error('err',error)
        }
    })
    useEffect(()=>{
        getProductDetails();
    },[productId])

  return (
    <div>
        {/* {"Details"+JSON.stringify(productDetails.data)} */}
       <div className="bg-gray-100 py-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row -mx-4">
        {productDetails.data && productDetails.data.map((Details)=>{
        return(
            <>
            
      <div className="md:flex-1 px-4">
        <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
          <img className="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
        </div>
        <div className="flex -mx-2 mb-4">
          <div className="w-1/2 px-2">
<button onClick={(e)=>{addToCart(e,Details)}} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
          </div>
          <div className="w-1/2 px-2">
            <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Add to Wishlist</button>
          </div>
        </div>
      </div>
            <div className="md:flex-1 px-4">
        <h2 className="text-2xl font-bold mb-2">{Details.product_name}</h2>
        <p className="text-gray-600 text-sm mb-4">{Details.product_description}</p>
        <div className="flex mb-4">
          <div className="mr-4">
            <span className="font-bold text-gray-700">Price:</span>
            <span className="text-gray-600">Rs.{Details.product_price}</span>
          </div>
          <div>
            <span className="font-bold text-gray-700">Availability:</span>
            <span className="text-gray-600">In Stock</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Select Color:</span>
          <div className="flex items-center mt-2">
            <button className="w-6 h-6 rounded-full bg-gray-800 mr-2" />
            <button className="w-6 h-6 rounded-full bg-red-500 mr-2" />
            <button className="w-6 h-6 rounded-full bg-blue-500 mr-2" />
            <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2" />
          </div>
        </div>

        <QuantityComponent/>
        
        <div className="mb-4">
          <span className="font-bold text-gray-700">Select Size:</span>
          <div className="flex items-center mt-2">
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">S</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">M</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">L</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XL</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XXL</button>
          </div>
        </div>
        <div>
          <span className="font-bold text-gray-700">Product Description:</span>
          <p className="text-gray-600 text-sm mt-2">{Details.product_description}
          </p>
        </div>
      </div>
            </>
        )
      })}
      
    </div>
  </div>
</div>
    </div>
  )
}
