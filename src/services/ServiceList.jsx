import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import service1 from '../assets/images/success.png'
import service2 from '../assets/images/discounts.png'
import service3 from '../assets/images/home-automation.png'

const serviceData = [
    {
        imgUrl: service1,
        title: "Convenience",
        desc: "Find the items you need quickly and easily through our platform.",
    },
    {
        imgUrl: service2,
        title: "Affordable price",
        desc: "The price being offered is extremely budget-friendly.",
    },
    {
        imgUrl: service3,
        title: "Rent Smarter",
        desc: "Find and rent quality items without having to buy.",
    },
]

const ServiceList = () => {
  return (
    <>
        {serviceData.map((item, index) => (
            <Col lg='3' key={index}>
                <ServiceCard item={item} />
            </Col>
        ))}
    </>
  );
};

export default ServiceList