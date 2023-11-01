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
import { useToast, useDisclosure, Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const queryClient = useQueryClient();

  const headers = [
    "SL No",
    "Date",
    "Customer Name",
    "Phone Number",
    "Item Name",
    "Price",
    "Pin",
    "Actions",
  ];

  const getOrder = async () => {
    const { data } = await dbObject.get(
      `/pending-orders?page=${page + 1}&limit=${limit}&search=${search}`
    );
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

          <Flex mt={6} mb={2} justifyContent={"flex-end"}>
            <Button
              onClick={() =>
                queryClient.invalidateQueries([
                  "pendingOrders",
                  page,
                  search,
                ])
              }
              gap={2}
            >
              <RepeatIcon /> Refresh
            </Button>
          </Flex>
          <OrderTable
            headers={headers}
            limit={limit}
            tableHeading="Pending Orders"
            data={data}
            isLoading={isLoading}
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
            setPage={setPage}
            setSearch={setSearch}
            page={page}
            search={search}
            queryClient={queryClient}
            confirmFn={[
              {
                fn: () => {
                  console.log("first");
                  onClose();
                  toast({
                    title: "Working fine",
                    status: "success",
                    duration: 1000,
                    position: "top",
                    isClosable: true,
                  });
                },

                btnText: "Edit",
                color: "yellow",
                heading: "Edit Item",
              },
              {
                fn: () => {
                  console.log("first");
                  onClose();
                  toast({
                    title: "Working fine",
                    status: "success",
                    duration: 1000,
                    position: "top",
                    isClosable: true,
                  });
                },

                btnText: "Delete",
                color: "red",
                heading: "Delete Item",
              },
            ]}
            actions={[
              {
                btnText: "Cancel",
                color: "red",
                fn: () => {
                  onOpen();
                },
              },

              {
                btnText: "Compelte",
                color: "yellow",
                fn: () => {
                  onOpen();
                },
              },
              {
                btnText: "Approve",
                color: "green",
                fn: () => {
                  onOpen();
                },
              },
            ]}
          />
        </div>
      </Layout>
    </Protected>
  );
};

export default Dashboard;
