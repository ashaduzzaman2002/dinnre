import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

import {
  Add,
  AddDark,
  Delete,
  Edit,
  Filter,
  FilterDark,
} from "../../assets/svg/Icon";
import Protected from "../../routes/Protected";
import { useQuery } from "@tanstack/react-query";
import { dbObject } from "../../helper/api";

const Verify = () => {
  const data = [
    {
      name: "D Bapi",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, dolor cum vel ipsa dolore est odit harum? Id, cumque amet?",
    },
    {
      name: "Dadaboudi",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, dolor cum vel ipsa dolore est odit harum? Id, cumque amet?",
    },
    {
      name: "Shimla Biriany",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, dolor cum vel ipsa dolore est odit harum? Id, cumque amet?",
    },
  ];

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  // const {
  //   data,
  //   isLoading,
  //   isError,
  // } = useQuery(["pendingRestaurants", page, search], async () => {
  //   const response = await fetch(
  //     `/api/getAllPendingRestaurants?page=${
  //       page + 1
  //     }&limit=${2}&search=${search}`
  //   );
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // });

  const [total, setTotal] = useState(0);

  const fetchRestaurants = async () => {
    const { data } = await dbObject.get(
      `/all/pending-restaurants?page=${page + 1}&limit=${2}&search=${search}`
    );

    setTotal(data?.total || 0);
    console.log(data);

    return data?.restaurants;
  };

  const {
    isLoading,
    error,
    data: restaurnats,
  } = useQuery({
    queryKey: ["pendingRestaurants", page, search],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Protected>
      <Layout title={"Verify"}>
        <div className="dashboard_container container cm">
          <div className="dashboard_container_order_report_container">
            <div className="dashboard_container_order_report_nav ">
              <div className="dashboard_container_order_report_nav_left d-flex justicy-content-center align-items-center">
                <h6>Pending Restaurnats</h6>
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
                  <button
                    className="dashboard_container_btn d-flex justify-content-center align-items-center gap-2 h-75 "
                    style={{ background: "#393C49" }}
                  >
                    <Filter />
                    <span>Filter Order</span>
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
                  <th className=" text-center">Status</th>
                </thead>
                <tbody className="tbl">
                  {restaurnats?.map((obj, i) => (
                    <tr key={i} className="list_card">
                      <td className="align-middle" style={{ minWidth: 100 }}>
                        <p className="fw-bold mb-1 ">{obj.name}</p>
                      </td>
                      <td
                        className=" align-middle"
                        style={{ minWidth: 100, maxWidth: 100 }}
                      ></td>
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

                  <div className="mt-2 p-0 bg-danger "></div>
                  <tr className="list_card">
                    <td colSpan={7}>
                      <div className="  my-2 d-flex  justify-content-end align-items-center gap-1 ">
                        <span onClick={() => setPage(Math.max(page - 1, 0))}>
                          prev
                        </span>

                        {Array.from({ length: Math.round(total / 2) }).map(
                          (_, i) => (
                            <div
                              key={i}
                              className="border border-white text-white d-inline-block"
                              style={{
                                padding: ".15rem .4rem",
                                background: "#393C49",
                                borderRadius: ".4rem",
                                fontSize: "10px",
                                textAlign: "center",
                              }}
                              onClick={() => setPage(i)}
                            >
                              {i + 1}
                            </div>
                          )
                        )}

                        <span onClick={() => setPage(Math.min(page + 1, Math.round(total / 2)))}>
                          Next
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </Protected>
  );
};

export default Verify;
