import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Login from './login/Login';
import Home from './homePage/Home';
import Addproduct from './AddProduct/Addproduct';
import Signup from './signup/SignUp';
import Profile from './viewProfile/Profile';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import ProductView from './ProductView/ProductView';
import Kart from './kart/kart';
import Navbar from './navbar/Navbar';
import OrderDetails from './order/OrderDetails';
import SearchedProductCard from './searchedproductcard/SearchedProductCard';
export default function MyRoutes() {

  const user=JSON.parse(localStorage.getItem("user"));

  return (
    <>
     

    <Routes>
          <Route path="/login" element={<Login  />}/>
          <Route path="/" element={<Home/>}/>
       {user!==null&&user.role==="admin"&& <Route path="/addproduct" element={<Addproduct/>}/>}  
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/updateproduct" element={<UpdateProduct/>}/>
          <Route path="/ProductView" element={<ProductView/>}/>
          <Route path="/kart" element={<Kart/>}/>
          <Route path="/order" element={<OrderDetails/>}/>
          <Route path="/searchedproduct" element={<SearchedProductCard/>}/>

    </Routes>
    </>
  )
}
