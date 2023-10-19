import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Increase } from "../../assets/svg/Icon";
import "./dashboard.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  const monthlyIncome = [
    { name: "Jan", inr: 4000 },
    { name: "Feb", inr: 3000 },
    { name: "Mar", inr: 2000 },
    { name: "Apr", inr: 2780 },
    { name: "May", inr: 1890 },
    { name: "Jun", inr: 2390 },
    { name: "Jul", inr: 3490 },
  ];

  const donatChart = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 200 },
    { name: "Category D", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [lineCharWidth, setLineChartWidth] = useState(640);
  const [lineCharHeight, setLineChartHeight] = useState(300);

  const [pieCharWidth, setPieChartWidth] = useState(640);
  const [pieCharHeight, setPieChartHeight] = useState(240);

  useEffect(() => {
    const updateChartWidth = () => {
      if (window.innerWidth < 576) {
        setLineChartWidth(350);
        setPieChartWidth(350);
        setPieChartHeight(265);
        setLineChartHeight(250);
      } else if (window.innerWidth < 768) {
        setLineChartWidth(500);
        setPieChartWidth(500);
        setPieChartHeight(265);
        setLineChartHeight(320);
      } else if (window.innerWidth < 992) {
        setLineChartWidth(370);
        setPieChartWidth(430);
        setPieChartHeight(265);
        setLineChartHeight(320);
      } else if (window.innerWidth < 1200) {
        setLineChartWidth(460);
        setPieChartWidth(460);
        setPieChartHeight(250);
        setLineChartHeight(320);
      } else if (window.innerWidth < 1400) {
        setLineChartWidth(550);
        setPieChartWidth(550);
        setPieChartHeight(250);
        setLineChartHeight(320);
      }
    };

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  return (
    <Layout>
      <div className="restaurant-dash">
        <div className="container" style={{ paddingTop: "6rem" }}>
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h3 className="mb-0 text-gray-800">Dashboard</h3>
          </div>

          <div className="dashboard_cards_lg d-md-flex d-none">
            {Data.map(({ title, amount, rate }, i) => (
              <div key={i} className="dashboard_card mobile">
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
              autoplay={{ delay: 100 }}
            >
              {Data.map(({ title, amount, rate }, i) => (
                <SwiperSlide key={i} className="dashboard_card mobile">
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

          <div className="mt-5 row">
            <div className="col-md-6 col-12">
              <LineChart
                width={lineCharWidth}
                height={lineCharHeight}
                data={monthlyIncome}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Line type="monotone" dataKey="inr" stroke="#8884d8" />
                <Tooltip label="name" formatter={(value) => [`INR ${value}`]} />
                <Legend />
              </LineChart>
            </div>

            <div className="col-md-6 col-12 mt-5 mt-md-0 d-flex align-items-center">
              <PieChart width={pieCharWidth} height={pieCharHeight}>
                <Pie
                  data={donatChart}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {donatChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
