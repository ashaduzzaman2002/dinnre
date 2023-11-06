import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { dbObject } from "../../helper/api";
import Protected from "../../routes/Protected";
import OrderTable from "../../components/table/OrderTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Orders = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 5;

  const queryClient = useQueryClient();

  const headers = [
    "Sl",
    "date",
    "Customer Name",
    "Phone Number",
    "Item Name",
    "Price",
    "Verification Pin",
    "Actions",
  ];

  useEffect(() => {
    console.log("Working");
  }, []);

  const getOrder = async () => {
    const { data } = await dbObject.get(
      `/all/orders?page=${page + 1}&limit=${limit}&search=${search}`
    );
    console.log(data);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", page, search],
    queryFn: getOrder,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  const startSerial = page * limit + 1;

  return (
    <Protected>
      <Layout title={"Orders"}>
        <div className="dashboard_container container cm">
          <OrderTable
            headers={headers}
            limit={limit}
            tableHeading="All Orders"
            data={data}
            isLoading={isLoading}
            setPage={setPage}
            page={page}
            setSearch={setSearch}
            search={search}
            startSerial={startSerial}
          />
        </div>
      </Layout>
    </Protected>
  );
};

export default Orders;
