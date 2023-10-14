import React from "react";
import "./confirm-order.css";
import Layout from "../../layout/Layout";
import { useState } from "react";

const ConfirmOrder = () => {
  const [user, setUser] = useState({ name: "", mobile: "" });
  return (
    <Layout>
      <div className="signup_container">
        <div className="signup_left_logo"></div>

        <div className="box signup_box">
          <h1>Confirm Your Order</h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="number"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          <div className="btn btn1">Confirm</div>
        </div>

        <div className="signup_right_logo"></div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;
