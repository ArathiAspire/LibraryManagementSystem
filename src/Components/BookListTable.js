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
  TextField,
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
import { CheckBox } from "@mui/icons-material";

const BookListTable = ({ libLogged }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const booksPerPage = 3;
  const [books, setBooks] = useState([]);
  const searchParams = useSearchParams();
  const LibLogged = searchParams.get("LibLogged");
  const [bookId, setBookId] = useState(null);

  const [selectedField, setSelectedField] = useState(""); // State to store the selected field
  const [searchValue, setSearchValue] = useState(""); // State to store the search input
  const [searchtitle, setSearchtitle] = useState("");
  const [searchauthor, setSearchauthor] = useState("");
  const [searchgenre, setSearchgenre] = useState("");
  const [searchavailability, setSearchavailability] = useState("");

  // const handleFieldChange = (event) => {
  //   setSelectedField(event.target.value);
  // };

  // const handleSearchChange = (event) => {
  //   setSearchValue(event.target.value);
  //   const { name, value } = event.target;
  //   setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  // };
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
  // const [filters, setFilters] = useState({
  //   title: "",
  //   genre: "",
  //   id: "",
  //   author: "",
  // });
  useEffect(() => {
    fetchBooks();
  }, [books]);

  const [currentPage, setCurrentPage] = useState(1);
  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
  //   setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  // };
  const fetchBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    let id = 1;
    for (const key in data) {
      loadedBooks.push({
        id: id,
        title: data[key].title,
        author: data[key].author,
        genre: data[key].genre,
        status: data[key].status,
      });
      id++;
    }
    setBooks(loadedBooks);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
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
  // const filteredBooks = books.filter((book) => {
  //   const { title, genre, id, author } = filters;
  //   return (
  //     (title === "" ||
  //       book.title.toLowerCase().includes(title.toLowerCase())) &&
  //     (genre === "" || book.genre.toLowerCase() === genre.toLowerCase()) &&
  //     (id === "" ||
  //       book.id.toLowerCase().toString().includes(id.toLowerCase())) &&
  //     (author === "" ||
  //       book.author.toLowerCase().includes(author.toLowerCase()))
  //   );
  // });

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentBooks = filteredBooks.slice(startIndex, endIndex);

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
        setLibrarianLogged(false);
      }
    });
    return () => {
      unsubscribe();
    };
  });
  const fields = ["id", "author", "title", "genre"];
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
  return (
    <div className="tabledata w-full overflow-x-auto text-slate-900 px-10">
      <div className="py-2 flex justify-center">
        {" "}
        {/* <FormControl
          style={{
            margin: 5,
            backgroundColor: "white",
            color: "black",
            width: 250,
          }}
        >
          <InputLabel required>Select Field</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Book"
            value={selectedField}
            onChange={handleFieldChange}
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Paper
          sx={{
            p: "1px 2px",
            display: "flex",
            alignItems: "center",
            width: 250,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            type="text"
            name={selectedField}
            placeholder={`search by ${
              selectedField ? selectedField : "id/title/author/genre"
            }`}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: "7px" }} aria-label="search">
            <SearchOutlinedIcon />
          </IconButton>
        </Paper> */}
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
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Book ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Status</th>
            {/* <th className="border p-2"></th> */}
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {currentBooks.map((book) => (
            <tr key={book.id} className="text-slate-200">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.status}</td>
              {adminLogged && (
                <td className="border">
                  <Button
                    color="error"
                    startIcon={<DeleteForeverSharpIcon />}
                    onClick={() => handleOpenDeleteModal(book.id)}
                  ></Button>
                  <Button
                    color="warning"
                    onClick={() => onEditBookHandler(book.id)}
                  >
                    <EditIcon />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Modal open={open} onClose={handleCloseDeleteModal}>
        <DeleteModal
          handleCloseModal={handleCloseDeleteModal}
          bookId={bookId}
        />
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEditModal}>
        <ModalEditBook
          handleCloseModal={handleCloseEditModal}
          editBook={currentBooks.find((book) => book.id === editBookId)}
        />
      </Modal>
    </div>
  );
};

export default BookListTable;
