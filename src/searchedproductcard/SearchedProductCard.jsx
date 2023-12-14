import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function SearchedProductCard({searched}) {

    const [allProducts, setAllProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
useEffect(()=>{
    if(localStorage.getItem("search")!=="")
  {  getProductsearched();}

},[]);
    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleHideModal = () => {
        setShowModal(false);
      };
    
      const handleFilter = (filters) => {
        // Handle filtering logic based on the filters
        console.log('Applying filters:', filters);
      };
      const location = useLocation();

      const getProductsearched = async () => {
        try {
          const url = "http://localhost:8080/products/search/"+location.state.search;
          const response = await axios.get(url);
    
          if (response.status === 200) {
            setAllProducts(response.data);
          } else {
            throw new Error(`Request failed with status ${response.status}`);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          throw error;
        }
      };  
    const navigate = useNavigate();

    const handleProductButtonClick = (productId) => {
      if (localStorage.length !== 0) {
        navigate('/ProductView', { state: { Id: productId } });
      } else {
        navigate('/login');
      }
    };
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
        <div className='my-5 py-2'></div>
        <div className='row colour mx-5 rounded-5 py-3'>
      {currentProducts.map((product, index) => (
        <div
          key={index}
          className='col-12 col-sm-6 col-md-4 col-lg-3  rounded-5 cardcolour border border-primary my-3 hovereffect pb-3 shopping-cart'
          onClick={() => handleProductButtonClick(product.id)}
        >
          <div className='mx-2 my-2 d-flex flex-column justify-content-between'>
            <div className=' px-2 py-2 rounded-5 d-flex border border-primary justify-content-center'>
              <img src={product.url} className='productcardimg' alt={product.name} />
            </div>
            <div className='d-flex flex-column justify-content-end align-items-center'>
              <p className='text-center'>{product.name}</p>
              <p className='text-center'>{product.detail}</p>
              <p className='text-center'>Mrp-&#8377;{product.price}/_</p>
            </div>
          </div>

        </div>
      ))}
      

      {/* Pagination */}
      <div className='pagination d-flex justify-content-center align-items-center'>
        {[...Array(Math.ceil(allProducts.length / productsPerPage)).keys()].map((number) => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className=' btn btn-outline-primary custom-width-input-button mx-1 text-center'>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}




