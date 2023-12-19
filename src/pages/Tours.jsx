import React, { useEffect, useState } from 'react'
import CommonSection from '../shered/CommonSection'
import '../styles/tour.css'

import TourCard from './../shered/TourCard'
import Newsletter from './../shered/Newsletter'
import SearchBar from './../shered/SearchBar'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product');
      setTours(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    }
  };

  useEffect(() => {
    const pages = Math.ceil(8/2)
    setPageCount(pages)
  },[page]) // ini di jalankan kalau ada peruahan data di data page di namakan depedensis

  useEffect(() => {
    fetchData();
  }, []); // nini di jalanan ketika halaman pertama kali di jalankan

  return (
    <>
      <CommonSection  title={'All Rent'}/>
      <section>
        <Container>
          <Row>
            <SearchBar/>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {tours?.map(tour => (
                <Col lg='3' className='mb-4' key={tour.id}>
                    <TourCard tour={tour}/>
                </Col>
            ))}
            
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map(number => (
                  <span key={number} onClick={() => setPage(number)} className={page===number ? 'active__page' : ''}>
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  )
}

export default Tours