import React, { useContext, useEffect, useState } from 'react';
import './menu.css';
import { Link, useParams } from 'react-router-dom';
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { baseURL } from '../../helper/api';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const { city } = useParams();
  const {loading, setLoading} = useContext(AppContext)

  const getRestaurantOfCity = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${baseURL}/restaurants/${city}/all`
      );
      console.log(data);
      setRestaurants(data.restaurants);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantOfCity();
  }, []);

  if(loading) return(
    <div
      id="spinner"
      className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        className="spinner-border text-primary"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  

  return (
    <section className="restaurants">
      <div
        className="text-center wow fadeInUp"
        data-wow-delay="0.1s"
        style={{
          visibility: 'visible',
          animationDelay: '0.1s',
          animationName: 'fadeInUp',
        }}
      >
        <h5
          className="section-title ff-secondary text-center fw-normal"
          style={{ color: '#FEA116' }}
        >
          Food Menu
        </h5>
        <h1
          className="mb-5"
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '800',
            lineHeight: '1.2',
            color: '#0F172B',
          }}
        >
          All Restaurants
        </h1>
      </div>
      <div
        className="_1jjVb"
        style={{
          background: '#e9e9eb',
          minHeight: '50vh',
          marginBottom: '-48px',
        }}
      >
        <div className="container pb-5">
          <div className="row">
            {restaurants?.length ? (
              restaurants.map((restaurant) => (
                <Card
                  key={restaurant._id}
                  name={restaurant.name}
                  location={restaurant.location}
                  profile_img={restaurant.profile_img}
                  id={restaurant._id}
                  city={city}
                />
              ))
            ) : (
              <div className="container d-flex align-items-center justify-content-center mt-5">
                <div className="row" style={{ width: '100%' }}>
                  <div className="col-lg-8 offset-lg-2 text-center">
                    <div className="error-text">
                      <h1>Oops! No Restaurant Found.</h1>
                      <p>Select a diffrent city</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollTop />
    </section>
  );
};

const Card = ({ name, location, profile_img, id }) => (
  <Link
    role="button"
    aria-label="Open"
    to={`/menu/restaurant/${id}`}
    className="restaurants-card col-xl-3 col-lg-4 col-md-6 col-12 mt-5"
  >
    <div className="restaurants-card-outer">
      <div className="tmKiP">
        <div className="_1zjMg">
          <div className="_1s9IR">{name}</div>
          <div className="_1VerS">{location}</div>
        </div>
      </div>

      <div className="_2Y2X_">
        <img
          className="_2tuBw _12_oN"
          alt="Chill Out Restaurant"
          width="70"
          height="70"
          src={profile_img}
        />
      </div>
    </div>
  </Link>
);

export default Restaurants;
