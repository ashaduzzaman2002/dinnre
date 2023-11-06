import React, { useState } from "react";
import AlertBox from "../alert/AlertBox";
import {
  Button,
  Flex,
  IconButton,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import LoadingSecond from "../laoding/LoadingSecond";
import { Add, AddDark, Filter, FilterDark } from "../../assets/svg/Icon";
import Pagination from "../pagination/Pagination";

const OrderTable = ({
  search,
  setSearch,
  data,
  limit,
  headers,
  isLoading,
  isOpen,
  onClose,
  setPage,
  page,
  actions,
  confirmFn,
  tableHeading,
  startSerial,
}) => {
  const [activeFn, setActiveFn] = useState(null);

  function formatDateTime(inputDateString) {
    // Parse the input date string
    const date = new Date(inputDateString);

    // Get the date in "dd/mm/yyyy" format
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Get the time in 12-hour format with "AM" or "PM"
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Format the date and time
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  return (
    <div className="dashboard_container_order_report_container">
      <div className="dashboard_container_order_report_nav ">
        <div className="dashboard_container_order_report_nav_left d-flex justicy-content-center align-items-center">
          <h6>{tableHeading}</h6>
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
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>
              {data?.total ? (
                <Pagination
                  limit={limit}
                  page={page}
                  totalPages={data.total}
                  setPage={setPage}
                />
              ) : null}
            </TableCaption>
            <Thead>
              <Tr>
                {headers?.map((item, i) => (
                  <Th key={i}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            {!isLoading && (
              <Tbody>
                {data?.data?.map((item, i) => {
                  const dataTime = formatDateTime(item.createdAt);
                  const serialNumber = startSerial + i;
                  return (
                    <Tr key={i}>
                      <Td>{serialNumber}.</Td>
                     
                      <Td textTransform={"capitalize"}>
                        {dataTime?.date} <br />
                        {dataTime?.time}
                      </Td>
                      <Td textTransform={"capitalize"}>{item.customerName}</Td>
                      <Td textTransform={"capitalize"}>
                        {item?.customerNumber}
                      </Td>
                      <Td textTransform={"capitalize"}>
                        {item?.items?.map((item, i) => (
                          <React.Fragment key={i}>
                            {i + 1}. {item.name} / {item.quantity} <br />
                          </React.Fragment>
                        ))}
                      </Td>

                      <Td textTransform={"capitalize"}>
                        ₹
                        {item?.totalAmount
                          ? parseInt(item?.totalAmount).toFixed(2)
                          : "0.00"}
                      </Td>
                      <Td>{item?.pin}</Td>
                      <Td>
                        <Flex gap={3}>
                          {actions?.map((btn, i) => (
                            <Button
                              key={i}
                              onClick={() => {
                                setActiveFn(i + 1);
                                btn.fn(item._id);
                              }}
                              colorScheme={btn.color}
                              size="sm"
                            >
                              {btn.btnText}
                            </Button>
                          ))}
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>

        <AlertBox
          isOpen={isOpen}
          btnColor={activeFn ? confirmFn[activeFn - 1].color : "red"}
          btnText={activeFn ? confirmFn[activeFn - 1].btnText : "Delete"}
          onClose={onClose}
          handleConfirm={activeFn ? confirmFn[activeFn - 1].fn : () => {}}
          heading={activeFn ? confirmFn[activeFn - 1].heading : "Delete"}
        />
        {isLoading && (
          <div
            className="d-flex align-items-center justify-content-center w-100"
            style={{ height: 100 }}
          >
            <LoadingSecond />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
