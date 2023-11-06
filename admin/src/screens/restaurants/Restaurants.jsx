import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Protected from "../../routes/Protected";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dbObject } from "../../helper/api";
import { useDisclosure, useToast } from "@chakra-ui/react";

import CustomTable from "../../components/table/CustomTable";

const Restaurants = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 5;

  const queryClient = useQueryClient();

  const toast = useToast();

  const fetchRestaurants = async () => {
    const { data } = await dbObject.get(
      `/all/verified-restaurants?page=${
        page + 1
      }&limit=${limit}&search=${search}`
    );
    console.log(data);

    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["restaurants", page, search],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000,
  });

  const headers = [
    "profile",
    "Name",
    "description",
    "City",
    "Location",
    "UPI ID",
    "Action",
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);

  const handleApprove = async (id) => {
    try {
      setId(id);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmApprove = async () => {
    try {
      onClose();
      toast({
        title: "Working fine",
        status: "success",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Protected>
      <Layout title={"Restaurants"}>
        <CustomTable
          tableHeading="All Restaurnats"
          search={search}
          setSearch={setSearch}
          data={data}
          limit={limit}
          headers={headers}
          isLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          setPage={setPage}
          page={page}
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

              btnText: "Deactive",
              color: "yellow",
              heading: "Deactive Restaurant",
            },
          ]}
          actions={[
            {
              btnText: "Deactive",
              color: "yellow",
              fn: () => {
                onOpen();
              },
            },
          ]}
        />
      </Layout>
    </Protected>
  );
};

export default Restaurants;
