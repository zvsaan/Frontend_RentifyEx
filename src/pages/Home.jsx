import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/homefoto.jpg'
import heroImg2 from '../assets/images/homefoto2.jpg'
import heroVideo from '../assets/images/homevideo.mp4'
import Subtitle from '../shered/Subtitle'

import SearchBar from '../shered/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Futured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonial from '../components/Testimonial/Testimonial'
import Newsletter from '../shered/Newsletter'

const Home = () => {
  return <>
  <section>
    <Container>
      <Row>
        <Col>
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-items-center">
            <Subtitle subtitle={<b>RENTIFY EXCHANGE</b>}/>
          </div>
          <h1>Best Rental Online<br></br>For All Items
          </h1>
            <p>
              Providing a Wide Range of High Quality Rental Items with<br></br>Unmatched Convenience and Comfort
            </p>
        </div>
        </Col>

        <Col lg='2'>
          <div className="hero__img-box">
            <img src={heroImg} alt='' />
          </div>
        </Col>

        <Col lg='2'>
          <div className="hero__img-box mt-4">
            <video src={heroVideo} alt='' controls/>
          </div>
        </Col>

        <Col lg='2'>
          <div className="hero__img-box mt-5">
            <img src={heroImg2} alt='' />
          </div>
        </Col>
        <SearchBar/>
      </Row>
    </Container>
  </section>


  <section>
    <Container>
      <Row>
        <Col lg='3'>
          <h2 className="services__title">We offer<br></br>best services</h2>
        </Col>
        <ServiceList/>
      </Row>
    </Container>
  </section>

  <section>
    <Container>
      <Row>
        <Col lg='12' className="mb-5">
          <Subtitle subtitle={'Explore'} />
          <h2 className="featured__tour-title">Our Feature Rent</h2>
        </Col>
        <FeaturedTourList/>
      </Row>
    </Container>
  </section>


  <section>
    <Container>
      <Row>
        <Col lg='12'>
            <Subtitle subtitle={'Gallery'}/>
            <h2 className="gallery__title">Visit our customers tour gallery</h2>
        </Col>
        <Col lg='12'>
          <MasonryImagesGallery/>
        </Col>
      </Row>
    </Container>
  </section>


  <section>
    <Container>
      <Row>
        <Col lg='12'>
            <Subtitle subtitle={'Fans Love'}/>
            <h2 className="testimonial__title">What our fans say about us</h2>
        </Col>
        <Col lg='12'>
          <Testimonial/>
        </Col>
      </Row>
    </Container>
  </section>

  <Newsletter/>

  </>
}

export default Home