"use client"
import React from "react";
import { useState,useEffect } from "react";

const BookListTable = () => {
    const [books, setBooks] = useState([]);

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
    setBooks(loadedBooks)
  };
  useEffect(()=>{
    fetchBooks();
  },[])
  const booklist = [
    { id: 1, title: "hdf", author: "hd", genre: "ghdfh", availability: 45 },
  ];
  return (
    <div className="w-full overflow-x-auto text-slate-900 p-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Book ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            {/* <th className="border p-2">Availability</th> */}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-slate-200">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              {/* <td className="border p-2">{book.availability}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookListTable;
