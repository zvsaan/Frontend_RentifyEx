import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./ty.css";

const ThankYou = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='pt-2 text-center'>
            <div className="thank__you">
              <span className="moving__icon"><i class="ri-shopping-cart-line"></i></span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb4">wait for your rent order</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;