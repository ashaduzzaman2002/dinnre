import React, { useEffect, useState } from "react";
import "./Restaurant-page.css";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { dbObject } from "../../helper/api";
import ProductCard from "../../components/product/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

const RestaurantPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [miniLoading, setMiniLoading] = useState(false);
  const [items, setItems] = useState([]);

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await dbObject(`/restaurants/restaurant/${id}`);

      if (data.success) {
        setData(data?.restaurant);
        fetchItems(data?.restaurant?._id);
      }
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchItems = async (id) => {
    try {
      setMiniLoading(true);
      const { data } = await dbObject(`/restaurants/restaurant/items/${id}`);

      if (data.success) {
        setItems(data?.items);
      }
      console.log(data);
      setMiniLoading(false);
    } catch (error) {
      console.log(error);
      setMiniLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <Layout title={data?.name || 'Not found'}>
        <div className="container cm">
          {data !== null ? (
            <div>
              <div>
                <div>
                  <h1>{data?.name}</h1>
                  <p>{data.location}</p>
                </div>
              </div>
              <hr />
              {miniLoading ? (
                <div
                  id="spinner"
                  className="show bg-white w-100 d-flex align-items-center justify-content-center"
                  style={{height: '50vh'}}
                >
                  <div
                    className="spinner-border text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : items.length ? (
                <div>
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
                </div>
              ) : (
                <div className="container d-flex align-items-center justify-content-center mt-5">
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-lg-8 offset-lg-2 text-center">
                      <div className="error-text">
                        <i class="bi bi-emoji-frown"></i>
                        <h1>No Items Availabe.</h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="container d-flex align-items-center justify-content-center mt-5">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-lg-8 offset-lg-2 text-center">
                  <div className="error-text">
                    <i class="bi bi-emoji-frown"></i>
                    <h1>Oops! Restaurant Not Found.</h1>
                    <p>Seacrhn for diffrent restaurnat</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  }
};

export default RestaurantPage;
