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

function ModalReturnBook(props) {
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

    const selectedBook = returningbooks.find((b) => b.book === e.target.value);
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

  const bookReturnHandler = async (e) => {
    e.preventDefault();

    const updatedReturnedBooks = [...returningbooks];
    const returnedBookIndex = updatedReturnedBooks.findIndex(
      (b) => b.book === enteredbook
    );
    if (returnedBookIndex !== -1) {
      updatedReturnedBooks[returnedBookIndex].status = "Returned";
      updatedReturnedBooks[returnedBookIndex].issuedTo = returnedFrom;
      setUpdatedBook(updatedReturnedBooks[returnedBookIndex]);
    }
    try {
      await fetch(
        `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry/${updatedBook.id}.json`,
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
      toast("Book Returned Successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "top-center",
      });
      props.handleClose();
    } catch (error) {
      toast("Error while returning book", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "error",
        position: "top-center",
      });
    }
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
            // label="Date of issue"
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

export default ModalReturnBook;
