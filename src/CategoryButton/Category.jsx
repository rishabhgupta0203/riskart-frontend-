import React, { useState } from 'react';
import ProductCard from '../card/ProductCard';
import './Category.css';
import Footer from '../footer/Footer';
export default function Category() {
  const [types, setTypes] = useState("getAllProducts");

  return (
    <>
      <div className='py-5 d-flex justify-content-around colour mx-5 rounded-5 mb-3 categorybutton'>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Fashion")}>Fashion</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Grocery")}>Grocery</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Utensils")}>Utencils</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Electronics Appliances")}>Electronics Appliances</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Shoes")}>Shoes</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Beauty")}>Beauty</button>
        <button className='btn btn-outline-primary' onClick={() => setTypes("Pharmacy")}>Pharmacy</button>
      </div>
      <ProductCard cat={types} />
      <Footer/>
    </>
  );
}
