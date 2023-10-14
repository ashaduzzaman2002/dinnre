import React, { useEffect, useState } from 'react';
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Switch from 'react-switch';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { baseURL } from '../../helper/api';

const Menu = () => {
  const { restaurant } = useParams();
  const [isVeg, setIsVeg] = useState(false);
  const { loading, setLoading } = useContext(AppContext);
  const [foods, setFoods] = useState([]);

  const [restaurantDetails, setRestaurantDetails] = useState(null);

  const getRestaurant = async () => {
    try {
      const { data } = await axios(
        `${baseURL}/restaurants/restaurant/${restaurant}`
      );
      setRestaurantDetails(data.restaurant);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/restaurants/restaurant/${restaurant}/foods`
      );

      setFoods(data.foods);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getRestaurant();
    getFoods();
  }, []);

  if (loading) {
    return (
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
  } else {
    return (
      <section className="restaurants">
        {restaurantDetails ? (
          <div className="container px-md-5 px-4">
            <div className="RestaurantHeader_wrapper__2GTdS RestaurantHeader_marginBottom__1rbfK">
              <div className="RestaurantNameAddress_wrapper__24l_g">
                <div aria-hidden="true">
                  <p className="RestaurantNameAddress_name__2IaTv">
                    {restaurantDetails.name}
                  </p>
                  <p className="RestaurantNameAddress_cuisines__mBHr2">
                    {restaurantDetails.dishes}
                  </p>
                </div>
                <div className="RestaurantFooterAddress_address__37uUA">
                  <div className="icon-markerDark RestaurantFooterAddress_icon__2Kjdg"></div>
                  <p>{restaurantDetails.location}</p>
                </div>
              </div>
              <div
                className="RestaurantRatings_wrapper__2294i"
                data-testid="restaurant-ratings-header"
                aria-hidden="true"
              >
                <span
                  className="RestaurantRatings_avgRating__1TOWY"
                  aria-hidden="true"
                >
                  <span className="icon-star"></span> <span>4.1</span>{' '}
                </span>
                <span
                  className="RestaurantRatings_totalRatings__3d6Zc"
                  aria-hidden="true"
                >
                  1K+ ratings
                </span>
              </div>
            </div>
            <hr />

            <div
              className="styles_vegOnly__3k3n5"
              data-testid="menu-veg-filter-switch"
            >
              <div
                className="styles_vegOnlyLabel__HR3Ii"
                aria-hidden="true"
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <p style={{ margin: 0 }}>Veg Only</p>
                <Switch
                  offColor="#e2e2e2"
                  onColor="#28c76f"
                  uncheckedIcon={false}
                  width={35}
                  height={15}
                  activeBoxShadow={''}
                  handleDiameter={11}
                  checkedIcon={false}
                  onChange={() => setIsVeg(!isVeg)}
                  checked={isVeg}
                />
              </div>
            </div>

            <hr />

            <div
              className="tab-class text-center wow fadeInUp"
              data-wow-delay="0.1s"
              style={{
                visibility: 'visible',
                animationDelay: '0.1s',
                animationName: 'fadeInUp',
              }}
            >
              <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                    data-bs-toggle="pill"
                    href="#tab-1"
                  >
                    <i className="fa fa-coffee fa-2x text-primary"></i>
                    <div className="ps-3">
                      <small className="text-body">Popular</small>
                      <h6 className="mt-n1 mb-0">Breakfast</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 pb-3"
                    data-bs-toggle="pill"
                    href="#tab-2"
                  >
                    <i className="fa fa-hamburger fa-2x text-primary"></i>
                    <div className="ps-3">
                      <small className="text-body">Special</small>
                      <h6 className="mt-n1 mb-0">Launch</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                    data-bs-toggle="pill"
                    href="#tab-3"
                  >
                    <i className="fa fa-utensils fa-2x text-primary"></i>
                    <div className="ps-3">
                      <small className="text-body">Lovely</small>
                      <h6 className="mt-n1 mb-0">Dinner</h6>
                    </div>
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div id="tab-1" className="tab-pane fade p-0 active show">
                  <div className="row g-4">
                    {foods.length ? (
                      foods?.map((food, i) => <Card key={i} data={food} />)
                    ) : (
                      <div className="container d-flex align-items-center justify-content-center mt-5">
                        <div className="row" style={{ width: '100%' }}>
                          <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="error-text">
                              <h1>Oops! No Item Availabe.</h1>
                              <p>Search diffrent Restaurant</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div id="tab-2" className="tab-pane fade p-0">
                  <div className="row g-4">
                    {restaurantDetails.length ? (
                      restaurantDetails.foods?.map((food, i) => (
                        <Card key={i} />
                      ))
                    ) : (
                      <div className="container d-flex align-items-center justify-content-center mt-5">
                        <div className="row" style={{ width: '100%' }}>
                          <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="error-text">
                              <h1>Oops! No Item Availabe.</h1>
                              <p>Search diffrent Restaurant</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div id="tab-3" className="tab-pane fade p-0">
                  <div className="row g-4">
                    {restaurantDetails.length ? (
                      restaurantDetails.foods?.map((food, i) => (
                        <Card key={i} />
                      ))
                    ) : (
                      <div className="container d-flex align-items-center justify-content-center mt-5">
                        <div className="row" style={{ width: '100%' }}>
                          <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="error-text">
                              <h1>Oops! No Item Availabe.</h1>
                              <p>Search diffrent Restaurant</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="row" style={{ width: '100%' }}>
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="error-text">
                  <h1>Oops! No Restaurant Found.</h1>
                  <p>Search diffrent Restaurant</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <ScrollTop />
      </section>
    );
  }
};

const Card = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { addToCart, getQuantity } = useContext(AppContext);

  const handleClick = (data) => {
    setIsClicked(!isClicked);
    addToCart(data);
  };

  return (
    <div className="col-lg-6">
      <div className="d-flex align-items-center">
        <Link to={`/menu/item/${data._id}`}>
          <img
            className="flex-shrink-0 img-fluid rounded"
            src={data.img}
            alt=""
            style={{ width: 80 }}
          />
        </Link>
        <div className="w-100 d-flex flex-column text-start ps-4">
          <h5 className="d-flex justify-content-between border-bottom pb-2">
            <Link to={`/menu/item/${data._id}`}>{data.name}</Link>
            <span className="text-primary">₹{data.price}</span>
          </h5>

          <div
            className="row justify-content-between pb-2"
            style={{ paddingRight: 10 }}
          >
            <small className="fst-italic col-8">{data.desc}</small>

            <div className="col-md-3 col-4 d-flex gap-1 align-items-center justify-content-between">
              <small>{getQuantity(data._id) || 0}</small>
              <button
                className="add-to-cart-btn"
                onClick={() => handleClick(data)}
              >
                <i class="bi bi-plus-circle-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
