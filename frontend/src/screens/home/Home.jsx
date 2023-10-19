import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import "./home.css";
import ProductCard from "../../components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { items } from "../../data/data";
import { AppContext } from "../../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = () => {
  const navigate = useNavigate();
  const { items, restaurants } = useContext(AppContext);
  const [swiper, setSwiper] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [gap, setGap] = useState(30);
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 404) {
        setSlidesPerView(1);
        setGap(10);
      } else if (window.innerWidth < 560) {
        setSlidesPerView(1.35);
        setGap(10);
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(3);
        setGap(15);
      } else {
        setSlidesPerView(4);
      }
    };

    // Update the slidesPerView initially and add a listener for window resize events
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  return (
    <Layout title="Home">
      <div className="container cm">
        <div className="page-heading d-flex justify-content-between mt-md-4">
          <h2>Most Popular Items</h2>
          <button
            className=" ls-btn"
            onClick={() => navigate("/item")}
            type="button"
          >
            View All
          </button>
        </div>

        <div className="item-container">
          {items.map((item, i) => (
            <ProductCard key={i} item={item} />
          ))}
        </div>

        <Swiper
          className="slider-custom"
          onSwiper={setSwiper}
          spaceBetween={gap}
          slidesPerView={slidesPerView}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <ProductCard key={i} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <button
            className="ss-btn mx-auto"
            onClick={() => navigate("/item")}
            type="button"
          >
            View All
          </button>
        </div>

        <hr className="my-lg-5" />

        <div className="page-heading d-flex justify-content-between">
          <h2>Most Popular Items</h2>
          <button
            className=" ls-btn"
            onClick={() => navigate("/restaurants")}
            type="button"
          >
            View All
          </button>
        </div>

        <div className="item-container">
          {restaurants?.map((item, i) => (
            <RestaurantCard key={i} item={item} />
          ))}
        </div>

        <Swiper
          className="slider-custom"
          onSwiper={setSwiper}
          spaceBetween={gap}
          slidesPerView={slidesPerView}
        >
          {restaurants.map((item, i) => (
            <SwiperSlide key={i}>
              <RestaurantCard key={i} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <button
            className="ss-btn mx-auto"
            onClick={() => navigate("/item")}
            type="button"
          >
            View All
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
