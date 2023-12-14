import React, { useEffect, useState } from 'react';
import './kart.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Kart() {
const[loadder,setloadder]=useState(true);
  const user=JSON.parse(localStorage.getItem("user"));
 const [totalAmount,settotalamount]=useState();
 const [orderplace,setorderplace]=useState(false);
  const addquantity=async(id)=>{
    try {
      const url = "http://localhost:8080/cart/" +user.id+"/add/"+id+"/"+1;
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log("added item from cart")
        setloadder(!loadder);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
};
// useEffect(()=>{



// },[orderplace]);
const subquantity=async(id)=>{
  try {
    const url = "http://localhost:8080/cart/" +user.id+"/changeQuantity/"+id;
    const response = await axios.post(url);

    if (response.status === 200) {
      console.log("subtracted item from cart")
      setloadder(!loadder);
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

const orderplaced=async()=>{
  try {
    const url = "http://localhost:8080/order/" +user.id+"/createOrder";
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("order placed")
      setloadder(!loadder);
setorderplace(!orderplace);  
window.location.href = "/order";

 } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
const navigate = useNavigate();

  const [allCart, setAllCart] = useState([]);
  const getCart = async () => {
    try {
      const url = "http://localhost:8080/cart/" +user.id+"/getCart";
      const response = await axios.get(url);

      if (response.status === 200) {
        setAllCart(response.data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  useEffect(() => {
    getCart();
   
  }, [loadder]);
useEffect(()=>{
  let total=0;
  for(let cart=0;cart<allCart.length;cart++)
  {
     total+=(allCart[cart].single_item.product.price*allCart[cart].single_item.quantity);
  }
  settotalamount(total);
},[loadder,allCart]);

  return (
   
  <div>
    <div className='gap'></div>
    <h2 className='text-center text-primary mb-2'>Shopping kart</h2>
    <hr/>
{

allCart.map((cart,index)=>(
    <div className='row mb-2 shopping-cart'>
      
      <div className='col-2'></div>
      <div className='col-8 row  kartcolour rounded-5'>
      <div className='col-4 d-flex justify-content-center align-items-center'>
        <img src={cart.single_item.product.url} className='cartimg'></img>
      </div>
      <div className='col-3 d-flex justify-content-center align-items-center'>
        <div>
        <p className='text-center text-primary ' >{cart.single_item.product.name}</p>
        <hr/>

        <p className='text-center text-primary'>INR {cart.single_item.product.price}</p>
        </div>
        </div>
        <div className='col-3 d-flex justify-content-center align-items-center'>
          <div>
        <button className='btn btn-outline-primary custom-width-input-button text-center px-0 py-0' onClick={()=>subquantity(cart.single_item.product.id)}>-</button>
        <button className='btn btn-primary custom-width-input-button text-center px-0 py-0' >{cart.single_item.quantity}</button>

<button className='btn btn-outline-primary custom-width-input-button text-center px-0 py-0' onClick={()=>addquantity(cart.single_item.product.id)}>+</button>
          </div>
          </div>
          <div className='col-2 text-primary d-flex justify-content-center align-items-center'>
          &#8377;{cart.single_item.quantity*cart.single_item.product.price}
            </div>
      </div>
      <div className='col-2'></div>
    </div>))}
    {(allCart.length!==0)?<div className='row'>
<div className='col-2'></div>
<div className='col-8 row '>
  <div className='col-5'></div>
  <div className='col-7 row kartcolour rounded-5 shopping-cart'><div className='col-8 d-flex justify-content-center align-items-center py-3'>
    <button className='btn btn-outline-primary kartbutton' onClick={orderplaced} >Place Order</button>
  </div>
  <div className='col-4 text-center text-primary py-3'>Total amount-&#8377;{totalAmount}</div>
  </div>
  
</div>
<div className='col-2'></div>
    </div>:<div className='d-flex justify-content-center my-5' > <h3 className='text-primary'>Cart is Empty!!</h3></div>}
  </div>

  )
}
