import React, { useEffect, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = ({ tour, avgRating }) => {
  const [datatour, setDataTour] = useState();
  const [hari, setHari] = useState(0);
  const [tanggal, setTanggal] = useState(new Date());
  const navigate = useNavigate();

  const totalAmount = Number(datatour?.price) * Number(hari);

  const handleClick = async (e) => {
    e.preventDefault();
    const idUser = JSON.parse(localStorage.getItem("id"));

    if (idUser === null || idUser === "") {
      toast.error("LOGIN TERLEBIH DAHULU", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (hari <= 0) {
        toast.error("ISI JUMLAH HARI TERLEBIH DAHULU", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/create/sewa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_product: datatour?.id_product,
            id_user: idUser,
            hari: hari,
            tanggal: tanggal,
            harga: datatour?.price,
            total: totalAmount,
          }),
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
    }
  };

  useEffect(() => {
    setDataTour(...tour);
  }, [tour]);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          Rp. {datatour?.price} <span> / days</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({datatour?.reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="number"
              placeholder="Days"
              name="hari"
              id="guestSize"
              required
              onChange={(e) => setHari(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              name="tanggal"
              id="bookAt"
              required
              onChange={(e) => setTanggal(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              Rp. {datatour?.price} <i className="ri-close-line"></i>per days
            </h5>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>Rp.{totalAmount}</span>
          </ListGroupItem>

          <Button className="btn booking__btn w-100 mt-4" onClick={handleClick}>
            Book Now
          </Button>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;