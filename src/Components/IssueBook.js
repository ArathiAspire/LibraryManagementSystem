"use client"
import {
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  FormControl,
} from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import { students } from "@/api/students";



function IssueBook(props) {
  const handleClose = () => {
    props.handleClose();
    console.log(books)
  };
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

 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form>
          <h3 className="text-blue-900 font-bold mx-auto">Issue Book</h3>
          <TextField
            id="standard-full-width"
            // label="Date of issue"
            type="date"
            style={{ margin: 8 }}
            // onChange={onSetTitle}
            placeholder="Enter date of issue"
            fullWidth
            required
            // defaultValue={props.title}
          />
          <FormControl fullWidth style={{ margin: 8 }}>
            <InputLabel required>Select Book</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={book}
              label="Add Product Category"
              // onChange={onSetCategory}
            >
            {books.map((book)=>(
              <MenuItem key={book.id} value={book.id}>
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
              // value={book}
              label="Borrower"
              // onChange={onSetCategory}
            >
            {students.map((student)=>(
              <MenuItem key={student.id} value={student.id}>
                {student.firstName}
              </MenuItem>
            ))}

            </Select>
          </FormControl>
          

        
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Issue
          </Button>

          <Button
            type="submit"
            variant="outlined"
            color="info"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}

export default IssueBook;
