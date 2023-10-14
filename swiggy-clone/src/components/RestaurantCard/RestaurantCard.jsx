import React from "react";
import "./restaurantCard.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ item }) => {
  return (
    <Link to={`/restaurant/menu/${item._id}`} className="card">
      <div className="image">
        <img src={"/images/restaurant1.jpg"} alt="item" />
      </div>

      <div className="card-text">
        <h1>{item.name}</h1>
        <h4>Italian, Pizzas, Fast Food, Mexican, Desserts, Beverages</h4>
      </div>
    </Link>
  );
};

export default RestaurantCard;
