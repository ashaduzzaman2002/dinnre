import React, { useState } from "react";
import "./dashboard.css";
import Layout from "../../layout/Layout";
import { dbObject } from "../../helper/api";
import Protected from "../../routes/Protected";
import OrderTable from "../../components/tables/OrderTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Text } from "@chakra-ui/react";
import { Increase } from "../../assets/svg/SVG";

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

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 5;

  const queryClient = useQueryClient();

  const headers = [
    "image",
    "Customer Name",
    "Phone Number",
    "Item Name",
    "Price",
    "Verification Pin",
    "Actions",
  ];

  const getOrder = async () => {
    const { data } = await dbObject.get("/pending-orders");
    console.log(data);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["pendingOrders", page, search],
    queryFn: getOrder,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Protected>
      <Layout title={"Menu"}>
        <div className="dashboard_container container cm">
          <Text fontSize={"xl"}>Dashboard</Text>

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
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
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

          <h6 className="" style={{ padding: "1rem 0rem", marginTop: ".8rem" }}>
            Recent Orders
          </h6>
          <OrderTable
            headers={headers}
            limit={limit}
            tableHeading="Pending Orders"
            data={data}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    </Protected>
  );
};

export default Dashboard;
