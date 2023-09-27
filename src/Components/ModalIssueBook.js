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
// import { students } from "@/api/students";
import { toast } from "react-toastify";

function ModalIssueBook(props) {
  const [issueDate, setIssuedate] = useState("");
  const [book, setBook] = useState("");
  const [borrower, setBorrower] = useState("");

  const issueDateHandler = (e) => {
    setIssuedate(e.target.value);
  };
  const issueBookHandler = (e) => {
    setBook(e.target.value);
  };
  const borrowerHandler = (e) => {
    setBorrower(e.target.value);
  };

  const handleClose = () => {
    props.handleClose();
    console.log(books);
  };
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  const fetchStudents = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/students.json"
    );
    const data = await response.json();
    const loadedStudents = [];
    for (const key in data) {
      loadedStudents.push({
        id: key,
        fname: data[key].fname,
        lname: data[key].lname,
        batch: data[key].batch,
        department: data[key].dept,
        contact: data[key].contact,
        email: data[key].email,
      });
    }
    setStudents(loadedStudents);
  };
  useEffect(() => {
    fetchStudents();
  }, []);

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
    const available = loadedBooks.filter((book) => book.status === "Available");
    setAvailableBooks(available);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const [issuedBooks, setIssuedBooks] = useState([]);

  const fetchIssuedBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    for (const key in data) {
      loadedBooks.push({
        id: key,
        book: data[key].book,
        borrower: data[key].borrower,
        issueDate: data[key].issueDate,
        status: data[key].status,
      });
    }
    setIssuedBooks(loadedBooks);
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const issueBook = books.filter((b) => b.title === book);

  const bookIssueHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books/${issueBook[0].id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "Not Available",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("status updated in booklist");
    } catch (error) {
      console.log("Error while updating status in booklist");
    }
    console.log(issueBook);
    const issueBooks = {
      issueBook,
      issueDate: issueDate,
      book: book,
      borrower: borrower,
      status: "Issued",
      returnDate: "Not returned",
    };
    const res = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json",
      {
        method: "POST",
        body: JSON.stringify(issueBooks),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    toast(`"${book}" issued to ${borrower} successfully`, {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });
    props.handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form onSubmit={bookIssueHandler}>
          <h3 className="text-blue-900 font-bold mx-auto">Issue Book</h3>
          <TextField
            id="standard-full-width"
            // label="Date of issue"
            type="date"
            style={{ margin: 8 }}
            onChange={issueDateHandler}
            value={issueDate}
            placeholder="Enter date of issue"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
          <FormControl fullWidth style={{ margin: 8 }}>
            <InputLabel required>Select Book</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={book}
              label="Select Book"
              onChange={issueBookHandler}
            >
              {availableBooks.map((book) => (
                <MenuItem key={book.id} value={book.title}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: 8 }}>
            <InputLabel required>Select Borrower</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={borrower}
              label="Borrower"
              onChange={borrowerHandler}
            >
              {students.map((student) => (
                <MenuItem
                  key={student.id}
                  value={student.fname + "" + student.lname}
                >
                  {student.fname} {student.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex justify-center space-x-4">
            <Button type="submit" variant="outlined" color="primary">
              Issue
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

export default ModalIssueBook;
