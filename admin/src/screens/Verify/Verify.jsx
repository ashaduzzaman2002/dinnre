import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Protected from "../../routes/Protected";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dbObject } from "../../helper/api";
import { useDisclosure, useToast } from "@chakra-ui/react";

import CustomTable from "../../components/table/CustomTable";

const Verify = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 5;

  const queryClient = useQueryClient();

  const toast = useToast();

  const fetchRestaurants = async () => {
    const { data } = await dbObject.get(
      `/all/pending-restaurants?page=${
        page + 1
      }&limit=${limit}&search=${search}`
    );
    console.log(data);

    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["pendingRestaurants", page, search],
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
      if (!id)
        return toast({
          title: "ID is missing",
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
      const { data } = await dbObject.put("/verify/" + id);
      if (data.success) {
        toast({
          title: data.msg,
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });

        queryClient.invalidateQueries(["pendingRestaurants", page, search]);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: error?.resposne?.data?.msg,
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
    }
  };

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <Protected>
      <Layout title={"Verify"}>
        <CustomTable
          tableHeading="Pending Restaurnats"
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

              btnText: "Decline",
              color: "red",
              heading: "Decline Restaurant",
            },
            {
              fn: handleConfirmApprove,

              btnText: "Approve",
              color: "green",
              heading: "Approve Restaurant",
            },
          ]}
          actions={[
            {
              btnText: "Decline",
              color: "red",
              fn: () => {
                onOpen();
              },
            },
            {
              btnText: "Approve",
              color: "green",
              fn: handleApprove,
            },
          ]}
        />
      </Layout>
    </Protected>
  );
};

export default Verify;
