"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleAvialability = (event) => {
    setAvailability(event.target.value);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const books = {
      title: title,
      author: author,
      genre: genre,
      availability: availability,
    };
    const res = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books.json",
      {
        method: "POST",
        body: JSON.stringify(books),
        headers: {
          "Content-Type": "appliaction/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    alert("Book Added Successfully");
    setTitle("");
    setGenre("");
    setAuthor("");
    setAvailability("");
    router.push('/Admin/BookList?LoggedIn=true')
  };
  return (
    <div>
      <form onSubmit={handleAddBook}>
        <div className="mb-4">
          <label className="block font-medium">Enter Title</label>
          <input
            style={{ color: "black" }}
            id="title"
            name="title"
            value={title}
            onChange={handleTitle}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Enter Author name</label>
          <input
            id="author"
            name="author"
            value={author}
            onChange={handleAuthor}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Enter Genre</label>
          <input
            id="genre"
            type="genre"
            name="genre"
            value={genre}
            onChange={handleGenre}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">
            Enter Availability of the book
          </label>
          <input
            id="availability"
            type="availability"
            name="availability"
            value={availability}
            onChange={handleAvialability}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
