import React from "react";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ page, totalPages, setPage, limit }) => {
  const numPagesToShow = 6;
  const totalPagesRounded = Math.ceil(totalPages / limit);

  // Calculate the range of pages to display
  const startPage = Math.max(
    0,
    Math.min(
      page - Math.floor(numPagesToShow / 2),
      totalPagesRounded - numPagesToShow
    )
  );
  const endPage = Math.min(startPage + numPagesToShow, totalPagesRounded);

  const pages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  );

  return (
    <Flex justifyContent={{ base: "start", lg: "center" }} gap={2}>
      <Button
        size={"sm"}
        onClick={() => setPage(Math.max(page - 1, 0))}
        isDisabled={page === 0}
      >
        <Icon as={ChevronLeftIcon} />
      </Button>

      {pages.map((i) => (
        <Button
          onClick={() => setPage(i)}
          key={i}
          colorScheme={i === page ? "teal" : "gray"}
          size="sm"
        >
          {i + 1}
        </Button>
      ))}

      <Button
        size={"sm"}
        isDisabled={page === totalPagesRounded - 1}
        onClick={() => setPage(Math.min(page + 1, totalPagesRounded - 1))}
      >
        <Icon as={ChevronRightIcon} />
      </Button>
    </Flex>
  );
};

export default Pagination;
