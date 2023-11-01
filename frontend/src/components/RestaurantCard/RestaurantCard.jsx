import React from "react";
import "./restaurantCard.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ item }) => {
  return (
    <Link to={`/restaurants/${item._id}`} className="card">
      <div className="image">
        <img src={item.profile_img} alt="item" />
      </div>

      <div className="card-text">
        <h1>{item.name}</h1>
        <h4>{item.location}</h4>
        {/* <h4>Italian, Pizzas, Fast Food, Mexican, Desserts, Beverages</h4> */}
      </div>
    </Link>
  );
};

export default RestaurantCard;
