import React, { useEffect, useState } from 'react'
import TourCard from '../../shered/TourCard'
// import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import axios from 'axios'

const FeaturedTourList = () => {
  const [tours, setTours] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product');
      setTours(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  return (
    <>
    {tours?.map(tour => (
        <Col lg='3' className='mb-4' key={tour.id}>
            <TourCard tour={tour}/>
        </Col>
    ))}</>
  )
}

export default FeaturedTourList