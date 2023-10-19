import React, { useContext, useEffect, useState } from "react";
import "./productCard.css";
import { Clock, Minus, Plus, Star } from "../../assets/svg/SVG";
import { AppContext } from "../../context/AppContext";

const ProductCard = ({ item }) => {
  const { addToCart, getQuantity } = useContext(AppContext);

  const initialQuantity = getQuantity(item._id);

  const [itemQuantity, setItemQuantity] = useState(initialQuantity);

  const incrementHandler = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const decrementHandler = () => {
    if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  // Use useEffect to update itemQuantity when initialQuantity changes
  useEffect(() => {
    setItemQuantity(initialQuantity);
  }, [initialQuantity]);


  return (
    <div className="card">
      <div className="image">
        <img src={item.img} alt="item" />
        <div className="time">
          <Clock />
          <span>{item.time || 30}</span>
        </div>
      </div>

      <div className="card-text">
        <h1>{item.name}</h1>
        <h4>{item.desc}</h4>

        <div className="d-flex gap-2 card-rating">
          <p className="m-0">{3.5}</p>
          <div className="d-flex align-items-center gap-1">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>

        <h3>₹{item.price}</h3>

        <div className="d-flex justify-content-between card-add-to-cart">
          <button
            onClick={() => addToCart(item, itemQuantity)}
            style={{
              backgroundColor: itemQuantity > 0 ? "#BE2AED" : "#F4F4F4",
              color: itemQuantity > 0 ? "#fff" : "#A3A3A3",
            }}
            disabled={itemQuantity > 0 ? false : true}
          >
            Add To Cart
          </button>

          <div className="d-flex card-inc-dec justify-content-between align-items-center">
            <div onClick={decrementHandler}>
              <Minus />
            </div>
            <p className="mb-0">{itemQuantity}</p>
            <div onClick={incrementHandler}>
              <Plus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
