"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const ModalEditBook = ({ handleCloseModal, editBook }) => {
  const router = useRouter();
  const [title, setTitle] = useState(editBook.title || "");
  const [author, setAuthor] = useState(editBook.author || "");
  const [genre, setGenre] = useState(editBook.genre || "");
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

      const updatedBooks = {
        title: title,
        author: author,
        genre: genre,
        // status: "Available",
      };
      const res = await fetch(
        `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books/${editBook.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedBooks),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const datas = await res.json();
      console.log(datas);
      toast("Book Updated Successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "bottom-left",
      });

      setTitle("");
      setGenre("");
      setAuthor("");
      handleCloseModal();
    
  };
  const handleClose = () => {
    handleCloseModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddBook}>
          <h3 className="text-blue-900 font-bold mx-auto py-5 ">Edit Book Details</h3>
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
          <div className="flex justify-center space-x-4">
            <Button type="submit" variant="outlined" color="primary">
              Edit
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

export default ModalEditBook;
