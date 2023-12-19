import React, { useState, useEffect } from "react";
import axios from "axios";
import TourCard from "./TourCard";

const TourList = () => {

  return (
    <div>
      <h2>Tour List</h2>
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default TourList;