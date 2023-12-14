// OrderDetails.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderDetails = () => {
  const [allOrder,setallOrder]=useState([]);
  const user=JSON.parse(localStorage.getItem("user"));
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const getorders=async()=>{
    try {
      const url = "http://localhost:8080/order/" +user.id+"/getOrders";
      const response = await axios.get(url);

      if (response.status === 200) {
        setallOrder(response.data.reverse());
        console.log(allOrder);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
  useEffect(()=>{
    getorders();
    
  },[]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allOrder.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  
  return (
   <>
   <div>
    <div className='gap'></div>
    <h2 className='text-center text-primary mb-2'>Order Placed</h2>
    <hr/>
{

currentProducts.map((cart,index)=>(
    <div className='row mb-2 shopping-cart'>
      
      <div className='col-2'></div>
      <div className='col-8 row  kartcolour rounded-5'>
      <div className='col-3 d-flex justify-content-center align-items-center'>
      <p className='text-center text-primary px-3'>{cart.product.product.name}</p>
      <hr/>
        <img src={cart.product.product.url} className='cartimg'></img>
      </div>
      <div className='col-2 d-flex justify-content-center align-items-center'>
        <div>
        <p className='text-center '>Order Status</p>
        <hr/>

        <p className='text-center '>{cart.product.orderstatus}</p>
        </div>
        </div>
        <div className='col-3 text-primary d-flex justify-content-center align-items-center'>
          <div>
            <p>Payment Mode:</p>
            <hr/>
           <p>Cash On Delivery</p>
          </div>
          </div>
          <div className='col-1  d-flex justify-content-center align-items-center text-center'>
        <div>
          <p>Quantity</p>
            <hr/>
            <p>{cart.product.quantity}</p>
            </div>
                 </div>
          <div className='col-3 text-primary d-flex justify-content-center align-items-center text-center'>
            <div>
            <p>Payment Amount:</p>
            <hr/>
            <p>&#8377;{cart.product.totalAmount}</p>
          </div>
            </div>
      </div>
      <div className='col-2'></div>
    </div>))}
    
    <div className="pagination d-flex justify-content-center align-items-center">
          {[
            ...Array(Math.ceil(allOrder.length / productsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className=" btn btn-outline-primary custom-width-input-button mx-1 d-flex  justify-content-center"
            >
            <p className="text-center">{number + 1}</p>  
            </button>
          ))}
        </div></div>
   </>
  );
};

export default OrderDetails;
