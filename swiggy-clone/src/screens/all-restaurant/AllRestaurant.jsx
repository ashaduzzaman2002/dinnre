import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { AppContext } from "../../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";

const AllRestaurant = () => {
  const { restaurants } = useContext(AppContext);
  const [swiper, setSwiper] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [gap, setGap] = useState(30)
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 404) {
        setSlidesPerView(1);
        setGap(10)
      } else if (window.innerWidth < 560) {
        setSlidesPerView(1.35);
        setGap(10)
      } else if (window.innerWidth < 992) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(3);
        setGap(15)
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
    <Layout title={'Restaurants'}>
      <div className="container cm">
        <div className="page-heading d-flex justify-content-between">
          <h2>All Popular Items</h2>
        </div>

        <div className="item-container">
          {restaurants.map((item, i) => (
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
      </div>
    </Layout>
  );
};

export default AllRestaurant;
