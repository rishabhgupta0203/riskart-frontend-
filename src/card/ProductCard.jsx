import React, { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductCard.css";
import axios from "axios";
import ProductView from "../ProductView/ProductView";
import FilterModal from "../filtermodal/FilterModal";
import { ThemeContext } from "../App"; // Import the ThemeContext
export const FilterContext = createContext(null);

export default function ProductCard({ cat }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { searched, setsearched } = useContext(ThemeContext);
  const contextValue = {
    showModal,
    setShowModal,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedColor,
    setSelectedColor,
    selectedBrand,
    setSelectedBrand,
  };
const filterprod={
  color:selectedColor,
  brand:selectedBrand,
  min:minPrice,
  max:maxPrice
}
  const getProductsearched = async () => {
    
    try {
      const url = "http://localhost:8080/products/search/" + searched;
      const response = await axios.get(url);

      if (response.status === 200) {
        setAllProducts(response.data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  const openmodal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (searched === "") {
      getProducts();
    } else {
      getProductsearched();
    }

  }, [searched]);
  const getProducts = async () => {
    try {
      const url = `http://localhost:8080/products/${cat}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setAllProducts(response.data);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
const getfilterproducts=async()=>{

  try {
    const url = "http://localhost:8080/products/"+cat+"/getFilteredProducts";
    const response = await axios.post(url,filterprod);

    if (response.status === 200) {
      setAllProducts(response.data);
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
  useEffect(() => {
    getProducts();
    setsearched("");
  }, [cat]);

  useEffect(() => {
    getProducts();
    setsearched("");

  }, []);
  useEffect(()=>{
getfilterproducts();
  },[selectedColor,selectedBrand,minPrice,maxPrice]);
  const navigate = useNavigate();

  const handleProductButtonClick = (productId) => {
    if (localStorage.length !== 0) {
      navigate("/ProductView", { state: { Id: productId } });
    } else {
      navigate("/login");
    }
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 

  // return (
  //   {showModal ? (<FilterContext value={contextValue}>
  //     <FilterModal />
  //   </FilterContext>) :
  //   <div className='row colour mx-5 rounded-5 py-3'>
  //     <div className='d-flex justify-content-end'>
  //       <img src='https://cdn-icons-png.flaticon.com/128/3839/3839020.png' className='fliterlogoimg mx-2' onClick={openmodal}>
  //         {/* <FilterContext value={contextValue}>
  //           <FilterModal />
  //         </FilterContext> */}
  //       </img>
  //       </div>
  //     {currentProducts.map((product, index) => (
  //       <div
  //         key={index}
  //         className='col-12 col-sm-6 col-md-4 col-lg-3  rounded-5 cardcolour border border-primary my-3 hovereffect pb-3 shopping-cart'
  //         onClick={() => handleProductButtonClick(product.id)}
  //       >
  //         <div className='mx-2 my-2 d-flex flex-column justify-content-between'>
  //           <div className=' px-2 py-2 rounded-5 d-flex border border-primary justify-content-center'>
  //             <img src={product.url} className='productcardimg' alt={product.name} />
  //           </div>
  //           <div className='d-flex flex-column justify-content-end align-items-center'>
  //             <p className='text-center'>{product.name}</p>
  //             <p className='text-center'>{product.detail}</p>
  //             <p className='text-center'>Mrp-&#8377;{product.price}/_</p>
  //           </div>
  //         </div>

  //       </div>
  //     ))}

  //     {/* Pagination */}
  //     <div className='pagination d-flex justify-content-center align-items-center'>
  //       {[...Array(Math.ceil(allProducts.length / productsPerPage)).keys()].map((number) => (
  //         <button key={number + 1} onClick={() => paginate(number + 1)} className=' btn btn-outline-primary custom-width-input-button mx-1 text-center'>
  //           {number + 1}
  //         </button>
  //       ))}
  //     </div>
  //   </div>
  // )};
  return (
    <>
      {(showModal && cat!=="getAllProducts" && searched==="") && (
        <FilterContext.Provider value={contextValue}>
          <FilterModal />
        </FilterContext.Provider>
      )}
      <div className="row colour mx-5 rounded-5 py-3">
      {(cat!=="getAllProducts" && searched==="") && ( <div className="d-flex justify-content-end">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3839/3839020.png"
            className="fliterlogoimg mx-2"
            onClick={openmodal}
          />
        </div> )}
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg-3  rounded-5 cardcolour border border-primary my-3 hovereffect pb-3 shopping-cart"
            onClick={() => handleProductButtonClick(product.id)}
          >
            <div className="mx-2 my-2 d-flex flex-column justify-content-between">
              <div className=" px-2 py-2 rounded-5 d-flex border border-primary justify-content-center">
                <img
                  src={product.url}
                  className="productcardimg"
                  alt={product.name}
                />
              </div>
              <div className="d-flex flex-column justify-content-end align-items-center">
                <p className="text-center">{product.name}</p>
                <p className="text-center">{product.detail}</p>
                <p className="text-center">Mrp-&#8377;{product.price}/_</p>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination */}
        <div className="pagination d-flex justify-content-center align-items-center">
          {[
            ...Array(Math.ceil(allProducts.length / productsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className=" btn btn-outline-primary custom-width-input-button mx-1 d-flex  justify-content-center"
            >
            <p className="text-center">{number + 1}</p>  
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
