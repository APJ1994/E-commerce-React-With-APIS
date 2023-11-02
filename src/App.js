
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Register from './pages/Register';
import Signin from './pages/Signin';
import DashBoard from './pages/DashBoard';
import { AuthProvider } from './AuthContext';
import {BrowserRouter as Router,Routes,Route, json} from "react-router-dom";
import ProductListing from './pages/ProductListing';
import { ProductDetails } from './pages/ProductDetails';
import Cart from './pages/Cart';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';

function App() {

  const[cart,setCart]=useState({});

  useEffect(()=>{
    const cart=window.localStorage.getItem('cart');
    setCart(JSON.parse(cart))
  

  },[])

  useEffect(()=>{
    window.localStorage.setItem('cart',JSON.stringify(cart));

  },[cart])



  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CartContext.Provider value={{ cart,setCart }}>
        <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="pages/dashboard" element={<DashBoard/>}/>  
      <Route path="pages/about" element={<About/>}/>
      <Route path="pages/register" element={<Register/>}/>
      <Route path="pages/signin" element= {<Signin/>} />
      <Route path="pages/productlisting/:categoryId" element={<ProductListing/>}/>
       <Route path="/productdetails/:productId" element={<ProductDetails/>}/> 
       <Route path="pages/cart" element={<Cart/>}/>
      </Routes>
      </CartContext.Provider>
      </AuthProvider>
      </Router>
         </div>
  );
}

export default App;
