import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import {
  Add,
  AddDark,
  Delete,
  Edit,
  Filter,
  FilterDark,
  Increase,
  Complete,
} from "../../assets/svg/SVG";
import ITEM from "../../assets/img/order_image.png";
import DP from "../../assets/img/order-dp.svg";
// import AddFood from "../AddFood/AddFood";
import AddItem from "../../components/add-item/AddItem";
import { dbObject } from "../../helper/api";
import Protected from "../../routes/Protected";
import CustomTable from "../../components/tables/OrderTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import MenuTable from "../../components/tables/MenuTable";

const Menu = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 5;

  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const headers = [
    "image",
    "Name",
    "Description",
    "Category",
    "Veg/Non Veg",
    "Price",
    "Actions",
  ];

  const getMenu = async () => {
    const { data } = await dbObject.get(
      `/menu?page=${page + 1}&limit=${limit}&search=${search}`
    );
    console.log(data);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["menu", page, search],
    queryFn: getMenu,
    staleTime: 5 * 60 * 1000,
  });

  console.log(error);

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Protected>
      <Layout title={"Menu"}>
        <div className="dashboard_container container cm">
          <MenuTable
            headers={headers}
            limit={limit}
            tableHeading="All Orders"
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
                btnText: "Edit",
                color: "yellow",
                fn: () => {
                  onOpen();
                },
              },
              {
                btnText: "Delete",
                color: "red",
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

export default Menu;
