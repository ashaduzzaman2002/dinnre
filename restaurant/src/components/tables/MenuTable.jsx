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
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import LoadingSecond from "../laoding/LoadingSecond";
import { Add, AddDark, Filter, FilterDark } from "../../assets/svg/SVG";
import AddItemModal from "../add-item/AddItemModal";

const MenuTable = ({
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
  onOpen,
  queryClient,
}) => {
  const [activeFn, setActiveFn] = useState(null);
  const [isModal, setIsModal] = useState(false);
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
                placeholder="Search"
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
              onClick={() => {
                onOpen();
                setIsModal(true);
              }}
            >
              <Add />
              <span>Add Order</span>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-center align-items-center gap-4 d-md-none">
          <div>
            <FilterDark />
          </div>
          <div
            onClick={() => {
              onOpen();
              setIsModal(true);
            }}
          >
            <AddDark />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>
              <Flex justifyContent={{ base: "start", lg: "center" }} gap={2}>
                <IconButton
                  size={"sm"}
                  isRound={true}
                  variant="solid"
                  aria-label="prev"
                  icon={<ArrowLeftIcon />}
                  onClick={() => setPage(Math.max(page - 1, 0))}
                />

                {Array.from({
                  length: Math.ceil(data?.total / limit),
                }).map((_, i) => (
                  <Button
                    onClick={() => setPage(i)}
                    key={i}
                    colorScheme="teal"
                    size="sm"
                  >
                    {i + 1}
                  </Button>
                ))}

                <IconButton
                  size={"sm"}
                  isRound={true}
                  variant="solid"
                  // colorScheme="teal"
                  aria-label="next"
                  icon={<ArrowRightIcon />}
                  onClick={() =>
                    setPage(
                      Math.min(page + 1, Math.ceil(data?.total / limit) - 1)
                    )
                  }
                />
              </Flex>
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
                {data?.data?.map((item, i) => (
                  <Tr key={i}>
                    <Td>
                      <Image
                        width={"40px"}
                        height={"40px"}
                        borderRadius="50%"
                        objectFit={"cover"}
                        src={item?.img}
                        alt=""
                      />
                    </Td>
                    <Td textTransform={"capitalize"}>{item.name}</Td>
                    <Td textTransform={"capitalize"}>{item?.desc}</Td>
                    <Td textTransform={"capitalize"}>{item.category}</Td>

                    <Td textTransform={"capitalize"}>{item.type}</Td>
                    <Td>
                      {" "}
                      ₹{item?.price ? parseInt(item?.price).toFixed(2) : "0.00"}
                    </Td>
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

        {isModal ? (
          <AddItemModal
            queryClient={queryClient}
            page={page}
            search={search}
            onClose={onClose}
            isOpen={isOpen}
          />
        ) : (
          <AlertBox
            isOpen={isOpen}
            btnColor={activeFn ? confirmFn[activeFn - 1].color : "red"}
            btnText={activeFn ? confirmFn[activeFn - 1].btnText : "Delete"}
            onClose={onClose}
            handleConfirm={activeFn ? confirmFn[activeFn - 1].fn : () => {}}
            heading={activeFn ? confirmFn[activeFn - 1].heading : "Delete"}
          />
        )}

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

export default MenuTable;
