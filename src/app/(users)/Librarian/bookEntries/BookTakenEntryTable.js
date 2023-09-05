"use client";

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import React, { useState, useEffect } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PropTypes from "prop-types";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function BookTakenEntryTable() {
  const [issueBooks, setIssueBooks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - issueBooks.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchIssueBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    let id = 1;
    for (const key in data) {
      loadedBooks.push({
        id: id,
        book: data[key].book,
        borrower: data[key].borrower,
        issueDate: data[key].issueDate,
        status: data[key].status,
        returnDate: data[key].returnDate,
      });
      id++;
    }

    setIssueBooks(loadedBooks);
  };
  useEffect(() => {
    fetchIssueBooks();
  }, [issueBooks]);
  const columns = [
    { id: "SL No.", label: "SL No.", minWidth: 170, align: "right" },
    { id: "Book", label: "Book", minWidth: 170, align: "right" },
    { id: "Issued to", label: "Issued to", minWidth: 170, align: "right" },
    { id: "Issued Date", label: "Issued Date", minWidth: 170, align: "right" },
    { id: "Status", label: "Status", minWidth: 170, align: "right" },
    {
      id: "Returned Date",
      label: "Returned Date",
      minWidth: 170,
      align: "right",
    },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold", // Add this line for bold text
                    fontSize: "18px", // Add this line for adjusting font size
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? issueBooks.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : issueBooks
            ).map((book) => (
              <TableRow key={book.id}>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.id}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.book}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.borrower}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.issueDate}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.status}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {book.returnDate}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={issueBooks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
    // <div className="w-full overflow-x-auto text-slate-900 p-8">
    //   <table className="min-w-full border border-gray-300">
    //     <thead>
    //       <tr className="bg-gray-100">
    //         <th className="border p-2">SL No.</th>
    //         <th className="border p-2">Book</th>
    //         <th className="border p-2">Issued to</th>
    //         <th className="border p-2">Issued Date</th>
    //         <th className="border p-2">Status</th>
    //         <th className="border p-2">Returned Date</th>

    //       </tr>
    //     </thead>
    //     <tbody className="bg-gray-900">
    //       {issueBooks.map((book) => (
    //         <tr key={book.id} className="text-slate-200">
    //           <td className="border p-2">{book.id}</td>
    //           <td className="border p-2">{book.book}</td>
    //           <td className="border p-2">{book.borrower}</td>
    //           <td className="border p-2">{book.issueDate}</td>
    //           <td className="border p-2">{book.status}</td>
    //           <td className="border p-2">{book.returnDate}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default BookTakenEntryTable;
