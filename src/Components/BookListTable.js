"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";

const BookListTable = ({libLogged}) => {
  const [books, setBooks] = useState([]);
  const searchParams = useSearchParams();
  const LibLogged = searchParams.get("LibLogged");
  const [filters, setFilters] = useState({ title: "", genre: "" });

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
        availability: data[key].availability,
      });
    }
    setBooks(loadedBooks);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const { title, genre } = filters;
    return (
      (title === "" ||
        book.title.toLowerCase().includes(title.toLowerCase())) &&
      (genre === "" || book.genre.toLowerCase() === genre.toLowerCase())
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
      
    }
  };

  return (
    <div className="tabledata w-full overflow-x-auto text-slate-900 p-8">
      <div className="p-2 flex mx-auto">
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
          {filteredBooks.map((book) => (
            <tr key={book.id} className="text-slate-200">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.status}</td>
              {!LibLogged && <td className="border p-2">
                <Button color="error" className="text-slate-color-red-600" onClick={()=>onDeleteHandler(book.id)}>Delete</Button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookListTable;
