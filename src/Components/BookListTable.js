"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import Pagination from "./Pagination";
import { toast } from "react-toastify";

const BookListTable = ({ libLogged }) => {
  const booksPerPage = 3;
  const [books, setBooks] = useState([]);
  const searchParams = useSearchParams();
  const LibLogged = searchParams.get("LibLogged");
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    id: "",
    author: "",
  });
  useEffect(() => {
    fetchBooks();
  }, [books]);

  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  const fetchBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    for (const key in data) {
      loadedBooks.push({
        id: key,
        title: data[key].title,
        author: data[key].author,
        genre: data[key].genre,
        status: data[key].status,
      });
    }
    setBooks(loadedBooks);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const { title, genre, id, author } = filters;
    return (
      (title === "" ||
        book.title.toLowerCase().includes(title.toLowerCase())) &&
      (genre === "" || book.genre.toLowerCase() === genre.toLowerCase()) &&
      (id === "" ||
        book.id.toLowerCase().toString().includes(id.toLowerCase())) &&
      (author === "" ||
        book.author.toLowerCase().includes(author.toLowerCase()))
    );
  });

  const onDeleteHandler = async (id) => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      const response = fetch(
        `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books/${id}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        console.log("Error while deleting");
      }
      fetchBooks();
      toast("Book Deleted", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "error",
        position: "top-center",
      });
    }
  };

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div className="tabledata w-full overflow-x-auto text-slate-900 px-10">
      <div className="py-2 flex mx-auto">
        {" "}
        <input
          className="rounded p-2 mx-auto"
          type="text"
          name="title"
          placeholder="search here by title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          className="rounded p-2 mx-auto"
          type="text"
          name="id"
          placeholder="search here by id"
          value={filters.id}
          onChange={handleFilterChange}
        />
        <input
          className="rounded p-2 mx-auto"
          type="text"
          name="author"
          placeholder="search here by author name"
          value={filters.author}
          onChange={handleFilterChange}
        />
        <input
          className="rounded p-2 mx-auto"
          type="text"
          name="genre"
          placeholder="search here by genre"
          value={filters.genre}
          onChange={handleFilterChange}
        />
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
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id} className="text-slate-200">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.status}</td>
              {!LibLogged && (
                <td className="border p-2">
                  <Button
                    color="error"
                    className="text-slate-color-red-600"
                    onClick={() => onDeleteHandler(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BookListTable;
