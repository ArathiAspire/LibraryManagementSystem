"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import DeleteModal from "./DeleteModal";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditBook from "./ModalEditBook";
import TablePaginationActions from "./TablePaginationActions";
import PropTypes from "prop-types";



TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BookListTable = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState(null);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchtitle, setSearchtitle] = useState("");
  const [searchauthor, setSearchauthor] = useState("");
  const [searchgenre, setSearchgenre] = useState("");
  const [searchavailability, setSearchavailability] = useState("");

  const handleSearchTitle = (event) => {
    setSearchtitle(event.target.value);
  };
  const handleSearchAuthor = (event) => {
    setSearchauthor(event.target.value);
  };
  const handleSearchGenre = (event) => {
    setSearchgenre(event.target.value);
  };
  const handleSearchAvailability = (event) => {
    setSearchavailability(event.target.value);
  };

  const handleOpenDeleteModal = (id) => {
    setOpen(true);
    setBookId(id);
  };
  const handleCloseDeleteModal = () => {
    setOpen(false);
  };

  const handleClearSearch = () => {
    setSearchtitle("");
    setSearchauthor("");
    setSearchgenre("");
    setSearchavailability("");
  };


  const fetchBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    let bookid = 1;
    for (const key in data) {
      loadedBooks.push({
        id: key,
        bookid: bookid,
        title: data[key].title,
        author: data[key].author,
        genre: data[key].genre,
        status: data[key].status,
      });
      bookid++;
    }
    setBooks(loadedBooks);
  };
  useEffect(() => {
    fetchBooks();
  }, [books]);
  const filteredBooks = books.filter((book) => {
    const titleMatch =
      searchtitle == "" ||
      book.title.toLowerCase().includes(searchtitle.toLowerCase());
    const authorMatch =
      searchauthor == "" ||
      book.author.toLowerCase().includes(searchauthor.toLowerCase());
    const genreMatch =
      searchgenre == "" ||
      book.genre.toLowerCase().includes(searchgenre.toLowerCase());
    const availablilityMatch =
      searchavailability == "" || book.status === searchavailability;
    return titleMatch && authorMatch && genreMatch && availablilityMatch;
  });

 
  // const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const [adminLogged, setAdminLogged] = useState(false);
  const [librarianLogged, setLibrarianLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        if (userEmail === "admin@gmail.com") {
          setAdminLogged(true);
        } else {
          setLibrarianLogged(true);
        }
      } else {
        setAdminLogged(false);
      }
    });
    return () => {
      unsubscribe();
    };
  });
  const handleOpenEditModal = (id) => {
    setOpenEdit(true);
  };
  const handleCloseEditModal = () => {
    setOpenEdit(false);
  };
  const [editBookId, setEditBookId] = useState("");
  const onEditBookHandler = (id) => {
    setEditBookId(id);
    handleOpenEditModal();
  };

  const columns = [
    { id: "Book ID", maxWidth: 5, label: "Book ID", align: "right" },
    { id: "Title", label: "Title", minWidth: 200, align: "right" },
    { id: "Author", label: "Author", minWidth: 170, align: "right" },
    { id: "Genre", label: "Genre", minWidth: 170, align: "right" },
    { id: "Status", label: "Status", minWidth: 170, align: "right" },
  ];
  return (
    <div className="tabledata w-full overflow-x-auto text-slate-900 px-10">
      <div className="py-2 flex justify-center">
        {" "}
        <Paper
          sx={{
            p: "1px 2px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="text"
            placeholder="Search by title"
            value={searchtitle}
            onChange={handleSearchTitle}
          />
        </Paper>
        <Paper
          sx={{
            p: "1px 2px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="text"
            placeholder="Search by author"
            value={searchauthor}
            onChange={handleSearchAuthor}
          />
        </Paper>
        <Paper
          sx={{
            p: "1px 2px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="text"
            placeholder="Search by genre"
            value={searchgenre}
            onChange={handleSearchGenre}
          />
        </Paper>
        <Paper
          sx={{
            p: "1px 2px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Select By Availability</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchavailability}
              label="Borrower"
              onChange={handleSearchAvailability}
            >
              <MenuItem value=""></MenuItem>

              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        <div className="p-2 justify-center">
          <button
            className="text-slate-100 bg-slate-900 rounded-lg p-2 hover:bg-slate-700 hover:text-slate-50"
            onClick={handleClearSearch}
          >
            Clear search
          </button>
        </div>
      </div>
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
                ? filteredBooks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredBooks
              ).map((book) => (
                <TableRow key={book.id}>
                  <TableCell
                    style={{ width: 10, fontSize: "15px" }}
                    align="right"
                  >
                    {book.bookid}
                  </TableCell>
                  <TableCell
                    style={{ width: 160, fontSize: "15px" }}
                    align="right"
                  >
                    {book.title}
                  </TableCell>

                  <TableCell
                    style={{ width: 160, fontSize: "15px" }}
                    align="right"
                  >
                    {book.author}
                  </TableCell>
                  <TableCell
                    style={{ width: 160, fontSize: "15px" }}
                    align="right"
                  >
                    {book.genre}
                  </TableCell>
                  <TableCell
                    style={{ width: 160, fontSize: "15px" }}
                    align="right"
                  >
                    {book.status}
                  </TableCell>
                  {adminLogged && (
                    <TableCell
                      style={{ width: 160, fontSize: "15px" }}
                      align="right"
                    >
                      <Tooltip title="delete book">
                        <Button
                          color="error"
                          startIcon={<DeleteForeverSharpIcon />}
                          onClick={() => handleOpenDeleteModal(book.id)}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="edit book details">
                        <Button
                          color="warning"
                          onClick={() => onEditBookHandler(book.id)}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 4, 5, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={filteredBooks.length}
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
        <Modal open={open} onClose={handleCloseDeleteModal}>
          <DeleteModal
            handleCloseModal={handleCloseDeleteModal}
            bookId={bookId}
          />
        </Modal>
        <Modal open={openEdit} onClose={handleCloseEditModal}>
          <ModalEditBook
            handleCloseModal={handleCloseEditModal}
            editBook={filteredBooks.find((book) => book.id === editBookId)}
          />
        </Modal>
      </Paper>
    </div>
  );
};

export default BookListTable;
