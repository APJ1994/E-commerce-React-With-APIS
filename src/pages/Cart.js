import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext'
import useRazorpay from 'react-razorpay'
const Cart = () => {

  let total=0;
  const[products,setProducts]=useState([])

  const {cart,setCart}=useContext(CartContext);

  const [priceFetched,toggleFetched]=useState(false)
  
  useEffect(()=>{
if(!cart.items)
{
  return;
}
if(priceFetched){
  return;
}
fetch('http://localhost/myecomm/MyApi/detailsProductCart',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({ids:Object.keys(cart.items)})

}).then(res=>res.json())
.then(products=>{
  setProducts(products)
  toggleFetched(true);

})
// console.log('cart',Object.keys(cart.items))
  },[cart])

  const getQty=(productID)=>{
return cart.items[productID]
  } 

  const incrementQty=(productID)=>{
    const existQty=cart.items[productID];
    const _cart={...cart};
    _cart.items[productID]=existQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }
  
  const decrementQty=(productID)=>{
    const existQty=cart.items[productID];
    if(existQty===1){
      return;
    }

    const _cart={...cart};
    _cart.items[productID]=existQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

  const getSum=(productId,price)=>{
    const sum=price * getQty(productId);
    total+=sum;
    return sum;

  }

  const handleRemove=(productId)=>{
    const _cart={...cart}
    const qty= _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updateProductList=products.filter((product)=>product.product_id !==productId)
    setProducts(updateProductList);



  }

  const Razorpay=useRazorpay();

const loadScript=(src)=>{
return new Promise((resolve)=>{
  const script=document.createElement('script')
  script.src=src

  script.onload=()=>{
    resolve(true)
  }
  script.onerror=()=>{
    resolve(false)
  }

  document.body.appendChild(script)
})
  }

  const displayRazorpay=async()=>{

  const res=await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
      alert('Your Offiline!');
      return
    }
    const data=await fetch('http://localhost/myecomm/MyPayment/paymentOrder',{method:'POST'}).then((t)=>
    t.json()
    )
    console.log(data);

    
    
    var options = {
      "key": "rzp_test_lyKkX7arHRJmeu", // Enter the Key ID generated from the Dashboard
      "amount":data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Ecomm App", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/",
      "order_id": data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert('payment suceessfully')
          // alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Aman Praksh", //your customer's name
          "email": "amanprakshjanoriya@gmail.com", 
          "contact": "9826451134"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#FFE333"
      }
  };


  const rzp=new window.Razorpay(options)
  rzp.open();

  }  

  return (

    !products.length ?
    <>
    <h3>Your cart is empty!</h3>
    <p>Add items to it now.</p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">ADD ITEM</button>
    </>
    :
    <div>
     
      {/* {"Products"+JSON.stringify(products)} */}
       <div className="bg-gray-100 h-screen py-8">
  <div className="container mx-auto px-4">
    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          
<table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-semibold">Product</th>
                <th className="text-left font-semibold">Price</th>
                <th className="text-left font-semibold">Quantity</th>
                <th className="text-left font-semibold">Total</th>
                <th className="text-left font-semibold">Remove</th>
              </tr>
            </thead>
            <tbody>
            {
            products && products.map((product)=>{
              return(
                <>
              <tr key={product.product_id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image" />
                    <span className="font-semibold">{product.product_name}</span>
                  </div>
                </td>
                <td className="py-4">₹{product.product_price}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <button onClick={()=>{decrementQty(product.product_id)}} className="border rounded-md py-2 px-4 mr-2">-</button>
                    <span className="text-center w-8">{getQty(product.product_id)}</span>
                    <button onClick={()=>{incrementQty(product.product_id)}} className="border rounded-md py-2 px-4 ml-2">+</button>
                  </div>
                </td>
                <td className="py-4">₹{getSum(product.product_id,product.product_price)}</td>
                <td><button onClick={()=>{handleRemove(product.product_id)}} class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">REMOVE ITEM</button></td>
              </tr>
              </>
              )
            })
          }
              {/* More product rows */}
            </tbody>
          </table>
          
               
          <div className="md:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹19.99</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>₹1.99</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹0.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Grand Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>
          <button onClick={displayRazorpay} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Order Now</button>
        </div>
      </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

    </div>
    
    
    
  )
}

export default Cart