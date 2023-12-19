import React from 'react'
import './common-section..css'

import { Container, Col } from 'reactstrap'

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
        <Container> 
            <Col lg='12'>
                <h1>{title}</h1>
            </Col>
        </Container>
    </section>
  )
}

export default CommonSection