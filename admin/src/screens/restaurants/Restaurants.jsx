import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import "./restaurants.css";
import {
  AddDark,
  Delete,
  Edit,
  Filter,
  FilterDark,
} from "../../assets/svg/Icon";
import Protected from "../../routes/Protected";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LoadingSecond from "../../components/laoding/LoadingSecond";
import { useQuery } from "@tanstack/react-query";
import { dbObject } from "../../helper/api";

const Restaurants = () => {
  // const {
  //   verifiedRestaurants,
  //   setVerifiedRestaurants,
  //   vrLoading,
  //   setVRLoading,
  // } = useContext(AppContext);

  const fetchRestaurants = async () => {
    const { data } = await dbObject.get("/all/verified-restaurants");
    console.log(data);

    return data?.restaurants;
  };

  const { isLoading, error, data: restaurnats } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60  * 1000
  });

  const handleSearch = (event) => {
    const value = event.target.value;
    let results = [];

    if (event.key === "Backspace" || event.key === "Delete") {
      const newValue = value?.slice(0, value?.length - 1);

      results = verifiedRestaurants.filter((item) =>
        item.name.toLowerCase().includes(newValue.toLowerCase())
      );
    } else {
      results = restaurnats.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setRestaurants(results);
  };

  console.log(error)


  return (
    <Protected>
      <Layout title={"Restaurants"}>
        <div className="dashboard_container container cm">
          <div className="dashboard_container_order_report_container">
            <div className="dashboard_container_order_report_nav ">
              <div className="dashboard_container_order_report_nav_left d-flex justicy-content-center align-items-center">
                <h6>Restaurnats</h6>
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
                      onChange={handleSearch}
                      onKeyDown={handleSearch}
                    />
                  </div>
                  <button
                    className="dashboard_container_btn d-flex justify-content-center align-items-center gap-2 h-75 "
                    style={{ background: "#393C49" }}
                  >
                    <Filter />
                    <span>Filter</span>
                  </button>
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
                className="table tbl "
                style={{
                  padding: "2rem",
                  borderSpacing: "1rem 1rem",
                  width: "100%",
                }}
              >
                <thead
                  className="table-light "
                  style={{
                    background: "#ebebeb59",
                    padding: "1rem 1rem",
                    borderRadius: "2rem",
                  }}
                >
                  {/* <th style={{ paddingLeft: "1rem" }}>Image</th> */}
                  <th>Tittle</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className=" text-center">Action</th>
                </thead>

                {!isLoading && (
                  <tbody className="tbl">
                    {restaurnats.map((obj, i) => (
                      <tr key={i} className="list_card">
                        <td className="align-middle" style={{ minWidth: 100 }}>
                          <p className="fw-bold mb-1 ">{obj.name}</p>
                        </td>
                        <td
                          className=" align-middle"
                          style={{ minWidth: 100, maxWidth: 100 }}
                        >
                          {obj.desc?.slice(0, 15)}
                          {obj.desc?.length > 15 ? "..." : ""}
                        </td>
                        <td
                          className=" align-middle text-capitalize"
                          style={{ minWidth: 100 }}
                        >
                          {obj.category}
                        </td>
                        <td
                          className=" align-middle text-capitalize"
                          style={{ minWidth: 100 }}
                        >
                          {obj.type}
                        </td>
                        <td className=" align-middle" style={{ minWidth: 100 }}>
                          ₹{obj.price}
                        </td>
                        <td className=" align-middle" style={{ width: "20%" }}>
                          <div className=" d-flex gap-2 justify-content-evenly align-items-center m-0 p-0">
                            <button
                              className="dashboard_container_status_btn"
                              style={{
                                background: "#E88B00",
                                cursor: "default",
                              }}
                            >
                              <Edit />
                              <span>Deactive</span>
                            </button>
                            <button
                              className="dashboard_container_status_btn"
                              style={{
                                background: "#DC3545",
                                cursor: "default",
                              }}
                              onClick={() => handleDelete(obj._id)}
                            >
                              <Delete />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

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
                            2
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
                            3
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>

              {isLoading && (
                <div
                  className="d-flex align-items-center justify-content-center w-100"
                  style={{ height: 300 }}
                >
                  <LoadingSecond />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Protected>
  );
};

export default Restaurants;
