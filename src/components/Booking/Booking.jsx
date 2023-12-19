import React, {useEffect, useState} from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const [datatour,setDataTour]= useState()
  // const { datatour?.price, datatour?.reviews } = datatour;
  // console.log('cek data props, ',  datatour);
  // const navigate = useNavigate();

  const [hari,setHari]=useState(0)
  const [tanggal,seTtanggal]=useState(new Date())
  const navigate = useNavigate(); 


  // const handleChange = e => {
  //   const idUser =  JSON.parse(localStorage.getItem("id")) 
  //   const totalAmount = Number(datatour?.price) * Number(hare.target.hari);
  //   const dataKirim = {
  //     id_product: datatour?.id_product,
  //   id_user: idUser,
  //   hari:e.target.hari,
  //   tanggal:e.target.tanggal,
  //   harga:datatour?.price,
  //   total:totalAmount
  // }
  // console.log('cek data kirim',dataKirim);
  // };

  const totalAmount = Number(datatour?.price) * Number(hari);

  const handleClick = async (e) => {
    e.preventDefault();
    const idUser = JSON.parse(localStorage.getItem("id"));
    const dataKirim = {
      id_product: datatour?.id_product,
      id_user: idUser,
      hari: hari,
      tanggal: tanggal,
      harga: datatour?.price,
      total: totalAmount,
    };

    try {
      const response = await fetch("http://localhost:8080/create/sewa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataKirim),
      });

      if (response.ok) {
        console.log("Booking successful!");
        navigate("/thank-you");
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
setDataTour(...tour)
  },[tour])

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          Rp. {datatour?.price} <span> / days</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({datatour?.reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
            <FormGroup>
            <input type="number" placeholder="Days" name="hari" id="guestSize" required onChange={(e)=> setHari(e.target.value)}/>
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
                <input type="date" placeholder="" name="tanggal" id="bookAt" required onChange={(e)=>seTtanggal(e.target.value)}/>               
            </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
            <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                    Rp. {datatour?.price} <i class="ri-close-line"></i>per days
                </h5>
                {/* <span>{datatour?.price}</span> */}
            </ListGroupItem>
            <ListGroupItem className="border-0 px-0 total">
                <h5>Total</h5>
                <span>Rp.{totalAmount}</span>
            </ListGroupItem>

            <Button className="btn booking__btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;