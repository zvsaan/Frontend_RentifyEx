import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import avatar from '../../assets/images/avatar.jpg'

const Testimonial = () => {
  const [data_testimoni, setDataTestimoni] = useState([]);

  const GetDataTestimoni = async () => {
    try {
      const getData = await axios.get(`http://localhost:8080/testimoni/`);
      setDataTestimoni(getData.data.data);
      console.log(getData);
    } catch (error) {
      console.error('Error fetching testimonial data:', error);
    }
  };

  useEffect(() => {
    GetDataTestimoni();
  }, []);

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data_testimoni.map(testimonial => (
        <div key={testimonial.id} className="testimonial py-4 px-3">
          <p>{testimonial.deskripsi}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img src={avatar} className='w-25 h-25 rounded-2' alt="" />
            <div>
              <h6 className='mb-0 mt-3'>{testimonial.nama}</h6>
              <p>{testimonial.who}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonial;