import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
// import img from "../assets/images/product1.jpg";

import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { id_product, photo, title, city, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={`http://localhost:8080/images/${photo}`} alt="product img" />
          {featured && <span>Best Seller</span> }
        </div>
 
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? ('Not Reted') : (<span>({reviews.length})</span>)}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/product/${id_product}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              Rp. {price} <span>/ days</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/product/${id_product}`}>Rent Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
