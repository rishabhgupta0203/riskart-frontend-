// FilterModal.js
import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FilterContext } from '../card/ProductCard';

const FilterModal = () => {
  const {showModal, setShowModal,minPrice, setMinPrice,maxPrice, setMaxPrice,selectedColor, setSelectedColor,selectedBrand, setSelectedBrand}=useContext(FilterContext);
  const [minPriceModal, setMinPriceModal] = useState(minPrice);
  const [maxPriceModal, setMaxPriceModal] = useState(maxPrice);
  const [selectedColorModal, setSelectedColorModal] = useState('');
  const [selectedBrandModal, setSelectedBrandModal] = useState('');

  const handleFilter = () => {
  
    setMinPrice(minPriceModal);
    setMaxPrice(maxPriceModal);
    setSelectedBrand(selectedBrandModal);
    setSelectedColor(selectedColorModal);
    setShowModal(false);
  };
const closemodal=()=>{setShowModal(false);};
  return (
    <Modal show={showModal}  centered>
      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title className='text-primary '>Filter Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="minPrice">
            <Form.Label>Min Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter min price"
              value={minPriceModal}
              onChange={(e) => setMinPriceModal(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="maxPrice">
            <Form.Label>Max Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max price"
              value={maxPriceModal}
              onChange={(e) => setMaxPriceModal(e.target.value)}
            />
            
          </Form.Group>
         
          <Form.Group controlId="brand">
            <Form.Label>Brand:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={selectedBrandModal}
              onChange={(e) => setSelectedBrandModal(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>color:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter color"
              value={selectedColorModal}
              onChange={(e) => setSelectedColorModal(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant="btn btn-outline-secondary" onClick={closemodal}>
          Close
        </Button>
        <Button variant="btn btn-outline-primary" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
