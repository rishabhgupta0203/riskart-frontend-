import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

export default function UpdateProduct() {

    
  const local = useLocation();

    const [newProduct, setProduct] = useState({
        name: '',
        category: '', // Set a default category
        price: 0,
        detail: '',
        brand: '',
        color: '',
        url: '',
      });
      useEffect(() => {
        const fetchData = async () => {
          try {
            const url = "http://localhost:8080/products/getById/"+local.state.id;
            const response = await axios.get(url);
            setProduct(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value,
        }));

      };
      useEffect(()=>{
        console.log(newProduct);

      },[newProduct]);
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/products/update', newProduct)
        
          .then((response) => {
            console.log('Product sent successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error sending data:', error);
          })
      
          
        
      };
      return (
        <>
          <h2 className="text-primary text-center pt-2 my-0">UPDATE PRODUCT</h2>
          <div className='row'>
            <div className='col-2'></div>
          <div className="colour  rounded-5 my-3 py-3 px-3 col-8">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productname">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  name="name"
                  placeholder="Product name to be displayed"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                >
                  <option>Fashion</option>
                  <option>Grocery</option>
                  <option>Utensils</option>
                  <option>Electronics Appliances</option>
                  <option>Shoes</option>
                  <option>Beauty</option>
                  <option>Pharmacy</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="detail">Detail</label>
                <input
                  type="text"
                  className="form-control"
                  id="detail"
                  name="detail"
                  value={newProduct.detail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  value={newProduct.color}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  value={newProduct.url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex justify-content-center py-3">
              <button type="submit" className="btn btn-outline-primary">
               UPDATE
              </button>
            </div>
            </form>
            
          </div>
          <div className='col-2'></div>
          </div>
        </>
      );
}



