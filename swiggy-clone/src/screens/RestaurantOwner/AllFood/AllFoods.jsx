import React, { useContext, useEffect, useState } from "react";
import RestaurantRoute from "../../../routes/RestaurantRoute";
import { dbObject } from "../../../helper/api";
import { AppContext } from "../../../context/AppContext";
import AddFood from "../AddFood/AddFood";
import {
  Add,
  AddDark,
  Delete,
  Edit,
  Filter,
  FilterDark,
} from "../../../assets/svg/SVG";
import Toastify, { tostOptions } from "../../../components/Toastify/Toastify";
import { toast } from "react-toastify";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const results = foods.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFoods(results);
  };

  const getData = async () => {
    try {
      const { data } = await dbObject.get(
        `/restaurants/restaurant/${user?.restaurant}/foods`
      );
      setFoods(data.foods);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    if (searchTerm === "") {
      getData();
    }
  }, [searchTerm]);

  const handleDelete = async (food_id) => {
    try {
      alert("Do you want to delete this item");
      const { data } = await dbObject.post("/restaurants/item/delete", {
        food_id,
      });
      console.log(data);

      if (data.success) {
        toast.success(data.msg, tostOptions);
        setFoods(foods.filter((item) => item._id !== food_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RestaurantRoute>
      <Toastify />
      <div className="dashboard_container container cm">
        {showModal === true ? (
          <AddFood
            setShowModal={setShowModal}
            setFoods={setFoods}
            foods={foods}
          />
        ) : null}

        <h4
          className="dash-heading mb-0"
          style={{ padding: "1rem 0rem", marginTop: ".8rem" }}
        >
          All Items
        </h4>

        <p className="dash-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="dashboard_container_order_report_container">
          <div className="dashboard_container_order_report_nav ">
            <div className="dashboard_container_order_report_nav_left d-flex justicy-content-center align-items-center">
              <h6>Menu</h6>
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
                  <span>Add Item</span>
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
                  padding: "1rem 1rem",
                  borderRadius: "2rem",
                }}
              >
                <th style={{ paddingLeft: "1rem" }}>Image</th>
                <th>Tittle</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th className=" text-center">Status</th>
              </thead>
              <tbody className="tbl">
                {foods.map((obj, i) => (
                  <React.Fragment key={i}>
                    <div className="mt-2"></div>
                    <tr className="list_card">
                      <td className="" style={{ width: "8%" }}>
                        <img
                          src={obj.img}
                          alt=""
                          height={"45px"}
                          width={"45px"}
                          style={{ borderRadius: "10px" }}
                        />
                      </td>
                      <td className="align-middle" style={{ minWidth: 100 }}>
                        <p class="fw-bold mb-1 ">{obj.name}</p>
                      </td>
                      <td
                        className=" align-middle"
                        style={{ minWidth: 100, maxWidth: 100 }}
                      >
                        {obj.desc.slice(0, 15)}
                        {obj.desc.length > 15 ? "..." : ""}
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
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#E88B00", cursor: "default" }}
                          >
                            <Edit />
                            <span>Update</span>
                          </div>
                          <div
                            className="dashboard_container_status_btn"
                            style={{ background: "#DC3545", cursor: "default" }}
                            onClick={() => handleDelete(obj._id)}
                          >
                            <Delete />
                            <span>Delete</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
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

export default AllFoods;
