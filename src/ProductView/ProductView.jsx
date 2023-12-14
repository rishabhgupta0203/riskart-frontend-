import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductView.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Make sure you are using version 6 or later

export default function ProductView() {
  const user=JSON.parse(localStorage.getItem("user"));
    const [Products,setProducts]= useState({
        name: '',
        category: 'Fashion', // Set a default category
        price: 0,
        detail: '',
        brand: '',
        color: '',
        url: '',
      });
      const navigate = useNavigate();

    const loc = useLocation();
    const [quantity,setquantity]=useState(1);
    const getProducts = async () => {
        try {
          const url = "http://localhost:8080/products/getById/" + loc.state.Id;
          const response = await axios.get(url);
      
          if (response.status === 200) {
            setProducts(response.data);
          } else {
            throw new Error(`Request failed with status ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          throw error;
        }
      };
      useEffect(()=>{getProducts();},[]);
      const addquantity=()=>{
           setquantity(quantity+1);
      };
      const subquantity=()=>{
        if(quantity>1)
        {
            setquantity(quantity-1);
        }
      }
      const buynow=async()=>{
        try {
          const url = "http://localhost:8080/products/" +user.id+"/BuyNow/"+loc.state.Id+"/"+quantity;
          const response = await axios.post(url);
      
          if (response.status === 200) {
            console.log("added item to cart")
            console.log(quantity);
            navigate("/order");
            
          } else {
            throw new Error(`Request failed with status ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          throw error;
        }
      }
      const editprod=()=>{
        navigate("/updateproduct", { state: { id:  loc.state.Id} });
      };
const addtocard=async()=>{
  try {
    const url = "http://localhost:8080/cart/" +user.id+"/add/"+loc.state.Id+"/"+quantity;
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("bought item")
      console.log(quantity);
      navigate("/kart");
      
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
  return (
    <div className='productviewbutton'>
        <div className='blockk'></div>
      <div className='row'>
      <div className='col-2'></div>

      <div className='col-8 colour rounded-5 border border-primary'>
      <div className='row pt-3'>
<div className='col-6   px-1 pt-5 d-flex flex-wrap'>
    <div className='d-flex justify-content-center align-item-center'><img src={Products.url} alt="" /></div>

</div>
<div className='col-6  pt-5 divider'>
    <h3>{Products.name}</h3>
    <hr/>
    <p>{Products.detail}</p>
    <p>Price-&#8377;{Products.price}</p>
    <p>Add Quantity</p>
    <div>
    <button className='btn btn-outline-primary custom-width-input-button text-center px-0 py-0' onClick={subquantity}>-</button>

        <button className='btn btn-primary custom-width-input-button text-center px-0 py-0' >{quantity}</button>

        <button className='btn btn-outline-primary custom-width-input-button text-center px-0 py-0' onClick={addquantity}>+</button>
    </div>
    <div className='d-flex justify-content-between px-1 py-3'>
              <button className='btn btn-outline-primary ' onClick={addtocard}>ADD TO CART</button>
              <button className='btn btn-outline-primary' onClick={buynow}>BUY NOW</button>
              {user.role==="admin" &&<button className="btn btn-outline-primary" onClick={editprod}>Edit product</button>
}
            </div>
</div>
</div>
      </div>
      <div className='col-2'></div>
      </div>
    </div>
  )
}
