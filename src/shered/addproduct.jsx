import React from 'react'
import './common-section..css'

import { Container, Col } from 'reactstrap'

const CommonSection2 = ({ title }) => {
  return (
    <section className="common__section2">
        <Container> 
            <Col lg='12'>
                <h1>{title}</h1>
            </Col>
        </Container>
    </section>
  )
}

export default CommonSection2