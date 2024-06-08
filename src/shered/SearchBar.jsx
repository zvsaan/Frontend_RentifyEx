import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {
  const productRef = useRef('');
  const locationRef = useRef('');
  const priceRef = useRef('');

  const searchHeader = () => {
    const product = productRef.current.value;
    const location = locationRef.current.value;
    const price = priceRef.current.value;

    // if (product === '' || location === '' || price === '') {
    //   return alert('Data tidak boleh kosong!');
    // }

    // Perform your search logic with the entered values
    console.log('Performing search with:', { product, location, price });
  };

  return (
    <Col lg='12'>
      <div className='search__bar'>
        <Form className='d-flex align-items-center gap-4'>
          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
              <i className='ri-archive-line'></i>
            </span>
            <div>
              <h6>Product</h6>
              <input type='text' placeholder='What do you find?' ref={productRef} />
            </div>
          </FormGroup>

          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
              <i className='ri-map-pin-line'></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type='text' placeholder='Where your location?' ref={locationRef} />
            </div>
          </FormGroup>

          <FormGroup className='d-flex gap-3 form__group form__group-last'>
            <span>
              <i className='ri-price-tag-3-line'></i>
            </span>
            <div>
              <h6>Price</h6>
              <input type='number' placeholder='What your budget?' ref={priceRef} />
            </div>
          </FormGroup>

          <span className='search__icon' onClick={searchHeader}>
            <i className='ri-search-line'></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;