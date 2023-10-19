import React, { useContext, useEffect, useState, useRef } from "react";
import "./restaurantDash.css";
import RestaurantRoute from "../../../routes/RestaurantRoute";
import { AppContext } from "../../../context/AppContext";
import { baseURL, dbObject } from "../../../helper/api";
import Layout from "../../../layout/Layout";
import ITEM from "../../../assets/img/order_image.png";
import DP from "../../../assets/img/order-dp.svg";
import AddFood from "../AddFood/AddFood";
import socketIOClient from "socket.io-client";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Pagination } from "swiper/modules";
import {
  Add,
  AddDark,
  Complete,
  Delete,
  Edit,
  Filter,
  FilterDark,
  Increase,
} from "../../../assets/svg/SVG";

const RestaurantDash = () => {
  // const [data, setData] = useState([]);
  // const { user } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);

  // const getData = async () => {
  //   try {
  //     const { data } = await dbObject.get(
  //       `/restaurants/restaurant/${user?.restaurant}/foods`
  //     );
  //     setData(data.foods);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, [user]);

  const getOrder = async () => {
    try {
      const {data} = await dbObject.get('/restaurants/all-orders')

      setOrders(data.order);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = socketIOClient(baseURL); // Use the correct server URL

    // Listen for new order events
    socket.on("newOrder", (order) => {
      // Update the orders state with the new order
      setOrders((prevOrders) => [...prevOrders, order]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    getOrder()
  }, [])

  const Data = [
    {
      title: "Order(Today)",
      amount: "100",
      rate: "+11.01%",
    },
    {
      title: "Earning(Today)",
      amount: "8000",
      rate: "-0.03%",
    },
    {
      title: "Order(Monthly)",
      amount: "40,000",
      rate: "+15.03%",
    },
    {
      title: "Order(Annual)",
      amount: "215,000",
      rate: "+6.08%",
    },
  ];

  const List = [
    {
      item_image: ITEM,
      customer_image: DP,
      customer: {
        name: "aaa bbb",
        image: DP,
      },
      title: "veg thali",
      catagory: "launch",
      type: "veg",
      price: "199.00",
    },
    {
      item_image: ITEM,
      customer_image: DP,
      customer: {
        name: "aaa bbb",
        image: DP,
      },
      title: "veg thali",
      catagory: "launch",
      type: "veg",
      price: "199.00",
    },
    {
      item_image: ITEM,
      customer_image: DP,
      customer: {
        name: "aaa bbb",
        image: DP,
      },
      title: "veg thali",
      catagory: "launch",
      type: "veg",
      price: "199.00",
    },
    {
      item_image: ITEM,
      customer_image: DP,
      customer: {
        name: "aaa bbb",
        image: DP,
      },
      title: "veg thali",
      catagory: "launch",
      type: "veg",
      price: "199.00",
    },
  ];

  return (
    <RestaurantRoute>
      <div className="dashboard_container container cm">
        <h6>Dashboard</h6>
        {showModal === true ? <AddFood setShowModal={setShowModal} /> : null}

        <div className="dashboard_cards_lg d-md-flex d-none">
          {Data.map(({ title, amount, rate }) => (
            <div className="dashboard_card mobile">
              <div>
                <span>{title}</span>
              </div>
              <div className="dashboard_card_bottom">
                <h5>₹{amount}</h5>
                <div className="dashboard_card_bottom_right">
                  <span>{rate}</span>
                  <div>
                    <Increase />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard_cards_sm d-block d-md-none">
          <Swiper
            className="Cards"
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            autoplay={{ delay: 100 }}
          >
            {Data.map(({ title, amount, rate }) => (
              <SwiperSlide className="dashboard_card mobile">
                <div>
                  <span>{title}</span>
                </div>
                <div className="dashboard_card_bottom">
                  <h5>₹{amount}</h5>
                  <div className="dashboard_card_bottom_right">
                    <span>{rate}</span>
                    <div>
                      <Increase />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h6 className="" style={{ padding: "1rem 0rem", marginTop: ".8rem" }}>
          Pending Order
        </h6>

        <div className="dashboard_container_order_report_container">
          <div className="dashboard_container_order_report_nav ">
            <div className="dashboard_container_order_report_nav_left d-flex justicy-content-center align-items-center">
              <h6>Order report</h6>
            </div>

            <div className="d-none d-md-flex">
              <div className=" order_report_nav_right d-flex gap-2 justicy-content-center align-items-center ">
                <div className="order_report_container_search  ">
                  <input
                    className="rounded-pill border border-white px-2 py-1 "
                    style={{ background: "#F4F4F4" }}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                  />
                </div>
                <div
                  className="order_report_container_filter_order dashboard_container_btn d-flex justify-content-center align-items-center gap-2 h-75 "
                  style={{ background: "#393C49" }}
                >
                  <Filter />
                  <span>Filter Order</span>
                </div>

                <div
                  className="order_report_container_search_add_order dashboard_container_btn d-flex justify-content-center align-items-center gap-2 h-75"
                  style={{ background: "#FF5249" }}
                  onClick={() => setShowModal(true)}
                >
                  <Add />
                  <span>Add Order</span>
                </div>
              </div>
            </div>

            <div className=" d-flex justify-content-center align-items-center gap-4 d-md-none">
              <div>
                <FilterDark />
              </div>
              <div>
                <AddDark />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table
              class="table tbl "
              style={{
                padding: "2rem",
                borderSpacing: "1rem 1rem",
                width: "100%",
              }}
            >
              <thead
                class="table-light "
                style={{
                  background: "#ebebeb59",
                  opacity: ".9",
                  padding: "1rem 1rem",
                  borderRadius: "2rem",
                }}
              >
                <th style={{ paddingLeft: "1rem" }}>Image</th>
                <th>Customer</th>
                <th>Tittle</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th className=" text-center">Status</th>
              </thead>
              <tbody className="tbl">
              {orders.map((obj) => (
                  <>
                    <div className="mt-2"></div>
                    <tr className="list_card">
                      <td className="" style={{ width: "8%" }}>
                        <img
                          src={obj?.item_image}
                          alt=""
                          height={"45px"}
                          width={"45px"}
                        />
                      </td>
                      <td className="customer align-middle" style={{}}>
                        <div class="d-flex align-items-center ">
                          <img
                            src={obj?.image}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                            class="rounded-circle"
                          />
                          <div class="ms-3">
                            <p class="fw-bold mb-1 ">{obj?.customerName}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" align-middle">{obj.title}</td>
                      <td className=" align-middle">{obj.catagory}</td>
                      <td className=" align-middle">{obj.type}</td>
                      <td className=" align-middle">${obj.price}</td>
                      <td className=" align-middle" style={{ width: "30%" }}>
                        <div className=" d-flex gap-2 justify-content-evenly align-items-center m-0 p-0">
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#E88B00" }}
                          >
                            <Edit />
                            <span>Edit</span>
                          </div>
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#DC3545" }}
                          >
                            <Delete />
                            <span>Delete</span>
                          </div>
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#198754" }}
                          >
                            <Complete />
                            <span>Complete</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}

                {List.map((obj) => (
                  <>
                    <div className="mt-2"></div>
                    <tr className="list_card">
                      <td className="" style={{ width: "8%" }}>
                        <img
                          src={List.at(0).item_image}
                          alt=""
                          height={"45px"}
                          width={"45px"}
                        />
                      </td>
                      <td className="customer align-middle" style={{}}>
                        <div class="d-flex align-items-center ">
                          <img
                            src={obj.customer.image}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                            class="rounded-circle"
                          />
                          <div class="ms-3">
                            <p class="fw-bold mb-1 ">{obj.customer.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" align-middle">{obj.title}</td>
                      <td className=" align-middle">{obj.catagory}</td>
                      <td className=" align-middle">{obj.type}</td>
                      <td className=" align-middle">${obj.price}</td>
                      <td className=" align-middle" style={{ width: "30%" }}>
                        <div className=" d-flex gap-2 justify-content-evenly align-items-center m-0 p-0">
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#E88B00" }}
                          >
                            <Edit />
                            <span>Edit</span>
                          </div>
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#DC3545" }}
                          >
                            <Delete />
                            <span>Delete</span>
                          </div>
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#198754" }}
                          >
                            <Complete />
                            <span>Complete</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}

                <div className="mt-2 p-0 bg-danger "></div>
                <tr className="list_card">
                  <td colSpan={7}>
                    <div className="  my-2 d-flex  justify-content-end align-items-center gap-1 ">
                      <span>prev</span>
                      <div
                        className="border border-white text-white d-inline-block  "
                        style={{
                          padding: ".15rem .4rem",
                          background: "#393C49",
                          borderRadius: ".4rem",
                          fontSize: "10px",
                          textAlign: "center",
                        }}
                      >
                        1
                      </div>
                      <div
                        className="border border-white text-white d-inline-block  "
                        style={{
                          padding: ".15rem .4rem",
                          background: "#393C49",
                          borderRadius: ".4rem",
                          fontSize: "10px",
                          textAlign: "center",
                        }}
                      >
                        1
                      </div>
                      <div
                        className="border border-white text-white d-inline-block  "
                        style={{
                          padding: ".15rem .4rem",
                          background: "#393C49",
                          borderRadius: ".4rem",
                          fontSize: "10px",
                          textAlign: "center",
                        }}
                      >
                        1
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RestaurantRoute>
  );
};

export default RestaurantDash;
