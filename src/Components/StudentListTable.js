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
import React, { useState,useEffect } from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
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

const StudentListTable = () => {
  const [students, setStudents] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    fetchStudents();
  }, [students]);
  const fetchStudents = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/students.json"
    );
    const data = await response.json();
    const loadedStudents = [];
    for (const key in data) {
      loadedStudents.push({
        id: key,
        fname: data[key].fname,
        lname: data[key].lname,
        batch: data[key].batch,
        department: data[key].dept,
        contact:data[key].contact,
        email:data[key].email
      });
    }
    setStudents(loadedStudents);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const columns = [
    { id: "ID",maxWidth: 5, label: "ID",  align: "right" },
    { id: "Full Name", label: "Full Name", minWidth: 200, align: "right" },
    { id: "Email", label: "Email", minWidth: 170, align: "right" },
    { id: "Contact", label: "Contact", minWidth: 170, align: "right" },
    {
      id: "Department",
      label: "Department",
      minWidth: 170,
      align: "right",
    },
    { id: "Batch", label: "Batch", minWidth: 170, align: "right" },
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
              ? students.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : students
            ).map((student,index) => (
              <TableRow key={student.id}>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {index+1}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {student.fname} {student.lname}
                </TableCell>
               
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {student.email}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {student.contact}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {student.department}
                </TableCell>
                <TableCell
                  style={{ width: 160, fontSize: "15px" }}
                  align="right"
                >
                  {student.batch}
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
                count={students.length}
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
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //         <th className="border p-2"></th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-gray-900">
    //       {students.map((student) => (
    //         <tr key={student.id} className="text-slate-200">
    //           <td className="border p-2">{student.id}</td>

    //           <td className="border p-2">{student.firstName}</td>
    //           <td className="border p-2">{student.lastName}</td>
    //           <td className="border p-2">{student.email}</td>

    //           <td className="border p-2">{student.contact}</td>
    //           <td className="border p-2">{student.department}</td>
    //           <td className="border p-2">{student.batch}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default StudentListTable;
