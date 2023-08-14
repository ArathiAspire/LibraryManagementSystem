"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";

const ModalAddBook = (props) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
 

  const handleAddBook = async (e) => {
    e.preventDefault();
    const books = {
      title: title,
      author: author,
      genre: genre,
      status: "Available",
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
    props.handleCloseAddBookModal();
  };
  const handleClose = () => {
    props.handleCloseAddBookModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddBook}>
          <h3 className="text-blue-900 font-bold mx-auto py-5 ">Add Book</h3>
          <TextField
            id="standard-full-width"
            placeholder="Enter Book Title"
            name="title"
            value={title}
            label="Enter Book title"
            onChange={handleTitle}
            required
            fullWidth
            className="py-3"
          />

          <TextField
            name="author"
            value={author}
            onChange={handleAuthor}
            required
            id="standard-full-width"
            placeholder="Enter Book Title"
            label="Enter Author of the Book"
            fullWidth
            className="py-3"
          />
          <TextField
            name="genre"
            value={genre}
            onChange={handleGenre}
            id="standard-full-width"
            placeholder="Enter Book Genre"
            label="Enter Book Genre"
            required
            fullWidth
            className="py-3"
          />
          <div className="p-2 mx-auto justify-center">
            <Button type="submit" variant="outlined" color="primary">
              Add
            </Button>

            <Button variant="outlined" color="info" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddBook;
