import React,{useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';
import Category from '../CategoryButton/Category';
import ProductCard from '../card/ProductCard';
export default function Home() {
 

  return (
    <div>
      <div className='homediv'></div>
    
        <h1 className='text-center mt-2 text-primary'>Riskart</h1>

        <h3 className='text-center mt-1 mb-3 text-primary'>Big Billion Days Sale</h3>
        
       <Category/>
       
    </div>
  );
}
