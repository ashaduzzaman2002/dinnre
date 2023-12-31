import React, { useState } from "react";
import AlertBox from "../alert/AlertBox";
import {
  Button,
  Flex,
  Icon,
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
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import LoadingSecond from "../laoding/LoadingSecond";
import { Filter, FilterDark } from "../../assets/svg/Icon";
import Pagination from "../pagination/Pagination";

const CustomTable = ({
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
}) => {
  const [activeFn, setActiveFn] = useState(null);
  return (
    <div className="dashboard_container container cm">
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
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="dashboard_container_btn d-flex justify-content-center align-items-center gap-2 h-75 "
                style={{ background: "#393C49" }}
              >
                <Filter />
                <span>Filter Order</span>
              </button>
            </div>
          </div>

          <div className=" d-flex justify-content-center align-items-center gap-4 d-md-none">
            <div>
              <FilterDark />
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
                  {data?.restaurants?.map((item, i) => (
                    <Tr key={i}>
                      <Td>
                        <Image
                          width={"40px"}
                          height={"40px"}
                          borderRadius="50%"
                          objectFit={"cover"}
                          src={item?.profile_img}
                          alt=""
                        />
                      </Td>
                      <Td textTransform={"capitalize"}>{item.name}</Td>
                      <Td textTransform={"capitalize"}>
                        {item?.about?.slice(0, 25)}...
                      </Td>
                      <Td textTransform={"capitalize"}>{item.city}</Td>
                      <Td textTransform={"capitalize"}>
                        {item?.location?.slice(0, 25)}...
                      </Td>
                      <Td>{item.upi}</Td>
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
                  ))}
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
    </div>
  );
};

export default CustomTable;
