import React, { useEffect, useState } from 'react'
import { NavLink,Link} from 'react-router-dom'
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../CartContext';

const Navbar = () => {
const {isLoggedIn,setIsLoggedIn}=useAuth();
const[category,setCategory]=useState([]);

const {cart}=useContext(CartContext);


const getCategory=(async()=>{
  try{
const res=await axios.get('http://localhost/myecomm/MyApi/categoryGet')
console.log(setCategory(res.data));
  }
  catch(err){
    console.error('error',err);

  }

})
useEffect(()=>{
getCategory();
},[])

const handleLogOut=()=>{
localStorage.removeItem('token');
setIsLoggedIn(false);
}
  return (
   <div>
    {/* {"Category"+JSON.stringify(category.data)} */}
   <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
  */}
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
         </svg>
           {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
     
        {isLoggedIn ?
        (
          <>
           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
           { category.data && category.data.map((categories)=>{
            return(
              <>
              <NavLink to={`pages/productlisting/${categories.category_id}`} className={({isActive})=>isActive ?
            "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            :"text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} key={categories.category_id}>
              {categories.category_name}</NavLink>
              </>
            )

           })}
            
          </div>
        </div>
        
      </div>
      
           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Link to="/pages/cart" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
         <span>{cart.totalItems}</span>
          <span className="absolute -inset-1.5" />
          <span className="sr-only"></span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-4 h-6 w-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
  </Link>
        {/* Profile dropdown */}
       
          
          {/*
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */} <div className="relative ml-3">
          <div className='mt-3'>
          <Link class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded" to="pages/signin" onClick={handleLogOut}>
  Sign Out
</Link>
          </div>
        </div>
      </div>
          </>
        ):
        (
        <>
<div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link to="pages/register" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Signup</Link>
            <Link to="pages/signin" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Signin</Link>
            
          </div>
        </div>
        </>
        )
        }
     
    </div>
  </div>
  {/* Mobile menu, show/hide based on menu state. */}
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
      <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>

   </div>
  )

}

export default Navbar