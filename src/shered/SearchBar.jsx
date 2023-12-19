import React, {useRef} from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'

const SearchBar = () => {

    const productRef = useRef('')
    const locationRef = useRef(0)
    const priceRef  = useRef(0)

    const searchHealder = () => {
        const product = productRef.current.value
        const location = locationRef.current.value
        const price = priceRef.current.value

        if(product ===''|| location === '' || price === '') {
            return alert("Data tida boleh kosong!");
        }
    }

  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span><i class="ri-archive-line"></i></span>
                <div>
                    <h6>Product</h6>
                    <input type="text" placeholder='What do you find?' ref={productRef}/>
                </div>
            </FormGroup>

            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span><i class='ri-map-pin-line'></i></span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder='Where your location?'ref={locationRef}/>
                </div>
            </FormGroup>

            <FormGroup className='d-flex gap-3 form__group form__group-last'>
                <span><i class="ri-price-tag-3-line"></i></span>
                <div>
                    <h6>Price</h6>
                    <input type="number" placeholder='What your budget?' ref={priceRef}/>
                </div>
            </FormGroup>

            <span className="search__icon" type='submit' onClick={searchHealder}>
                <i class='ri-search-line'></i>
            </span>
        </Form>
    </div>
  </Col>
}

export default SearchBar