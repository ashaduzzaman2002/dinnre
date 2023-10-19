import React from "react";
import Layout from "../../layout/Layout";

const Dashboard = () => {
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

  return (
    <Layout>
      <div className="restaurant-dash">
        <div class="container" style={{ paddingTop: "6rem" }}>
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <div class="row">
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
