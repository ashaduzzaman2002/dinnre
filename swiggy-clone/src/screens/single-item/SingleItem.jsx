import React from "react";
import "./single-item.css";
import Layout from "../../layout/Layout";
import { Minus, Plus, Star } from "../../assets/svg/SVG";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { items } from "../../data/data";
import ProductCard from "../../components/product/ProductCard";

const SingleItem = () => {
  const [cartItem, setCartItem] = useState(0);

  const incrementHandler = () => {
    setCartItem(cartItem + 1);
  };

  const decrementHandler = () => {
    if (cartItem > 0) {
      setCartItem(cartItem - 1);
    }
  };

  const navigate = useNavigate()

  return (
    <Layout title="Home">
      <div className="container cm">
        <div className="row item-details">
          <div className="col-lg-6">
            <div className="row flex-column-reverse flex-lg-row h-100">
              <div className="col-lg-3 d-flex flex-lg-column gap-2 mt-4 mt-lg-0">
                <div className="w-100 mini-item-image"  >
                    <img src="/images/item1.png" alt="item" />
                </div>

                <div className="w-100 mini-item-image">
                    <img src="/images/item1.png" alt="item" />
                </div>

                <div className="w-100 mini-item-image">
                    <img src="/images/item1.png" alt="item" />
                </div>

                <div className="w-100 mini-item-image">
                    <img src="/images/item1.png" alt="item" />
                </div>
              </div>
              <div className="col-lg-9 big-item-image ">
                <img src="/images/item1.png" alt="item" />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0 d-flex align-items-center">
            <div>
              <h2>Double Cheese Margherita Pizza</h2>
              <div className="d-flex gap-2 card-rating">
                <p className="m-0">4.5</p>
                <div className="d-flex align-items-center gap-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </div>

              <ul className="ps-3">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>consectetur adipiscing elit.</li>
                <li>dolor sit amet, consectetur adipiscing elit.</li>
              </ul>

              <p>
                Etiam sollicitudin tristique tortor at ornare. Mauris quis arcu
                id felis aliquet ultrices. Donec rutrum pretium ante, a tempor
                lacus interdum eu. Nulla dictum felis dui,
              </p>

              <div className="d-flex align-items-center gap-3">
                <h3 className="mb-0">₹250</h3>

                <div className="d-flex justify-content-between mt-0 card-add-to-cart">
                  <div className="d-flex card-inc-dec justify-content-between align-items-center">
                    <div onClick={decrementHandler}>
                      <Minus />
                    </div>
                    <p className="mb-0">{cartItem}</p>
                    <div onClick={incrementHandler}>
                      <Plus />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-add-to-cart">
                <button
                  style={{
                    backgroundColor: cartItem > 0 ? "#BE2AED" : "#F4F4F4",
                    color: cartItem > 0 ? "#fff" : "#A3A3A3",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='page-heading d-flex justify-content-between mt-5 mb-4'>
          <h2>Most Popular Items</h2>
          <button onClick={() => navigate('/item')} type='button'>View All</button>
        </div>

        <div className='item-container'>
          {
            items.slice(0, 4).map((item, i) => (
              <ProductCard key={i} item={item} />
            ))
          }
        </div>

      </div>
    </Layout>
  );
};

export default SingleItem;
