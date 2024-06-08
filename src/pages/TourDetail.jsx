import React, {useEffect, useRef, useState} from 'react'
import '../styles/tour-detail.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
// import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
// import img from '../assets/images/product1.jpg'
import Booking from '../components/Booking/Booking'
import axios from 'axios'

const TourDetail = () => {

  const [tours, setTours] = useState([]);

  const {id} = useParams();
  const reviewMsRef = useRef('')
  const [tourRating, setTourRating]=useState(null)

  const { totalRating, avgRating } = calculateAvgRating(tours[0]?.reviews)

  const options = {day:'numeric', month:'long', year:'numeric'}

  // const submitHandler = e => {
  //   e.preventDefault()
  //   const reviewText = reviewMsRef.current.value;

  //   alert(`${reviewText}, ${tourRating}`);
  // }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/product/byId/'+id);
      // console.log('response.data.data',response.data.data);
      const tour = response.data.data;
      // console.log('cek filter',tour,id);
      setTours(tour);
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  // console.log('Tours:', tours);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isiKeterangan = e.target.keterangan.value
    const isiRating = tourRating
    const idUser =  JSON.parse(localStorage.getItem("id"))
    const idProduct = id
    console.log('form', {idProduct,idUser,isiKeterangan,isiRating})
      if (isiKeterangan === "" || isiRating === null || isiKeterangan === null || isiRating === "") {
          alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
      } else {
          e.preventDefault();
          await axios.post('http://localhost:8080/create/reviews', {
              id_product: idProduct,
              id_user: idUser,
              keterangan: isiKeterangan,
              rating: isiRating,
          }).then(res=>{
            console.log('respon post', res);
            if(res.data.status === 'success'){
              alert(res.data.messages);
              fetchData()
            }else{
              alert(res.data.messages);
            }
          });
          
      }
  };

  return (
    <section>
      <Container>
        {/* {JSON.stringify(tours)} */}
        <Row> 
          <Col lg='8'>
            <div className="tour__content">
              {/* <img src={`http://localhost:8080/images/${photo}`} alt="" /> */}
              <img src={`http://localhost:8080/images/${tours[0]?.photo}`} alt="" />

              <div className="tour__info">
                <h2>{tours[0]?.title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i
                      class="ri-star-fill" 
                      style={{'color':"var(--secondary-color)"}}></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? ('Not Reted') : (<span>({tours[0]?.reviews?.length})</span>)}
                  </span>

                  <span>
                    <i class='ri-apps-line'></i> {tours[0]?.category}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span><i class='ri-map-pin-2-line'></i>{tours[0]?.city}</span>
                  <span><i class='ri-price-tag-3-line'></i>Rp{tours[0]?.price}/ days</span>
                </div>
                <h5>Deskripsi</h5>
                <p>{tours[0]?.desc}</p>
              </div>

              <div className="tour__reviews mt-4">
                <h4>Reviews ({tours[0]?.reviews?.length} reviews)</h4>
                <Form on onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span onClick={()=>setTourRating(1)}>
                      1 <i class='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTourRating(2)}>
                      2 <i class='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTourRating(3)}>
                      3 <i class='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTourRating(4)}>
                      4 <i class='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTourRating(5)}>
                      5 <i class='ri-star-s-fill'></i>
                    </span>
                  </div>
                  <div className="review__input__item">
                    <input 
                      type="text" ref={reviewMsRef} 
                      placeholder='share your thoughts' 
                      required
                      name="keterangan"/>
                    <button className="btn primary__btn text-white" type='submit'>
                      Submit
                    </button>
                  </div>
                </Form>
                
                <ListGroup className='user__reviews'>
                  {tours[0]?.reviews?.map(review => (
                    <div className="review__item">
                      <img src={avatar} alt="" />

                      <div className="w-100">
                        <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <h5>{review.username}</h5>
                            <p>{new Date(review.waktu).toLocaleDateString("id-ID", options)}</p>
                          </div>
                          <span className="d-flex align-items-center">
                            {review.rating} <i class='ri-star-s-fill'></i>
                          </span>
                        </div>
                        <h6>{review.keterangan}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
          
              </div>
            </div>  
          </Col>
          <Col lg='4'>
            <Booking tour={tours} avgRating={avgRating}/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default TourDetail