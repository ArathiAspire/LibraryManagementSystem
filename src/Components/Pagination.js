/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "@mui/material";
import React from "react";

const Pagination = ({
  booksPerPage,
  totalBooks,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  return (
    <nav>
      <ul className="flex items-center justify-center space-x-2 pt-5">
        <Button
          onClick={goToPreviousPage}
          className={`prev ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
          key="prev"
        >
          prev
        </Button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`bg-white border-2 border-gray-600 rounded-full w-9 h-9 flex items-center justify-center ${
              currentPage === number ? "bg-gray-300" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
        <Button
          onClick={goToNextPage}
          className={`next ${
            currentPage === pageNumbers.length
              ? "pointer-events-none opacity-50"
              : ""
          }`}
          key="next"
        >
          next
        </Button>
      </ul>
    </nav>
  );
};

export default Pagination;
