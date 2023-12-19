import React, { useState } from 'react';
import './newsleter.css';
import { Container, Row, Col } from 'reactstrap';
import meleTourist from '../assets/images/male-tourist.png';
import axios from 'axios';

const Newsletter = () => {
  const [nama, setNama] = useState('');
  const [who, setWho] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/create/testimoni/', {
        nama: nama,
        who: who,
        deskripsi: deskripsi,
      });

      console.log('Testimonial submitted:', response.data);
      // Tambahkan logika atau tindakan lain setelah pengiriman testimonial berhasil
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      // Tambahkan penanganan kesalahan jika pengiriman testimonial gagal
    }
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Send your Testimonial.</h2>
              <form onSubmit={handleSubmit}>
                <div className="newsletter__input">
                  <input type="text" placeholder='Masukkan Nama' value={nama} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div className="newsletter__input">
                  <input type="text" placeholder='Who' value={who} onChange={(e) => setWho(e.target.value)} />
                </div>
                <div className="newsletter__input">
                  <input type="text" placeholder='Masukkan Deskripsi' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                </div>
                <button type='submit' className="btn newsletter__btn">Submit</button>
              </form>
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter__img">
              <img src={meleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;