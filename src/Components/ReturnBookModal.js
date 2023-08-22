"use client";
import {
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  FormControl,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function ReturnBookModal(props) {
  const [returnDate, setReturndate] = useState("");
  const [enteredbook, setEnteredBook] = useState("");
  const [returnedFrom, setReturnedFrom] = useState("");
  const [returningbooks, setReturningBooks] = useState([]);
  const [borrowersForSelectedBook, SetBorrowersForSelectedBook] = useState([]);

  const returnDateHandler = (e) => {
    setReturndate(e.target.value);
  };
  const returnBookHandler = (e) => {
    setEnteredBook(e.target.value);

    const selectedBook = returningbooks.find(
      (b) => b.book === e.target.value && b.status === "Issued"
    );
    if (selectedBook) {
      SetBorrowersForSelectedBook([selectedBook.issuedTo]);
      setReturnedFrom(selectedBook.issuedTo);
    } else {
      SetBorrowersForSelectedBook([]);
      setReturnedFrom("");
    }
  };
  const returnFromHandler = (e) => {
    setReturnedFrom(e.target.value);
  };
  const handleClose = () => {
    props.handleClose();
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
      );
      const data = await response.json();
      const loadedBooks = [];
      for (const key in data) {
        loadedBooks.push({
          id: key,
          book: data[key].book,
          issuedTo: data[key].borrower,
          status: data[key].status,
        });
      }
      setReturningBooks(loadedBooks);
    } catch (error) {
      console.log("Error fetching");
    }
  };

  const [updatedBook, setUpdatedBook] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooksFromBooks = async () => {
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
    fetchBooksFromBooks();
  }, []);

  const returnBook = books.filter((b) => b.title === enteredbook);

  const bookReturnHandler = async (e) => {
    e.preventDefault();

    const updatedReturnedBooks = [...returningbooks];
    console.log("====================================");
    console.log("updated returnbook:", updatedReturnedBooks);
    console.log("====================================");
    const returnedBookIndex = updatedReturnedBooks.findIndex(
      (b) => b.book === enteredbook && b.status === "Issued"
    );
    if (returnedBookIndex !== -1) {
      setUpdatedBook(updatedReturnedBooks[returnedBookIndex]);
    }
    const bookToUpdate = updatedReturnedBooks[returnedBookIndex];
    console.log("updating book:", bookToUpdate);
    // try {
    await fetch(
      `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry/${bookToUpdate.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: "Returned",
          issuedTo: returnedFrom,
          returnDate: returnDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(returnBook);

    try {
      await fetch(
        `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books/${returnBook[0].id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "Available",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status updated to available in books.json");
    } catch (error) {
      console.log("Error while updating status to available in books.json");
    }

    toast("Book Returned Successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });

    props.handleClose();
  };
  useEffect(() => {
    fetchBooks();
  }, [updatedBook]);

  const filteredBook = returningbooks.filter(
    (book) => book.status === "Issued"
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form onSubmit={bookReturnHandler}>
          <h3 className="text-blue-900 font-bold mx-auto">Return Book</h3>
          <TextField
            id="standard-full-width"
            type="date"
            style={{ margin: 8 }}
            onChange={returnDateHandler}
            value={returnDate}
            placeholder="Enter date of return"
            fullWidth
            required
          />
          <FormControl fullWidth style={{ margin: 8 }}>
            <InputLabel required>Returning Book</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={enteredbook}
              label="Select Book"
              onChange={returnBookHandler}
            >
              {filteredBook.map((book) => (
                <MenuItem key={book.id} value={book.book}>
                  {book.book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: 8 }}>
            <InputLabel required>Returned from</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={returnedFrom}
              label="Returned from"
              onChange={returnFromHandler}
            >
              {borrowersForSelectedBook.map((borrower) => (
                <MenuItem key={borrower} value={borrower}>
                  {borrower}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex justify-center space-x-4">
            <Button type="submit" variant="outlined" color="primary">
              Returned
            </Button>

            <Button
              className="px-4"
              variant="outlined"
              color="info"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReturnBookModal;
