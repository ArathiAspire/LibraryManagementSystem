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
import { students } from "@/api/students";

function ReturnBook(props) {

  const [returnDate,setReturndate]=useState("")
  const returnDateHandler=(e)=>{
    setReturndate(e.target.value)
  }
//   const [book,setBook]=useState("")
//   const issueBookHandler=(e)=>{
//     setBook(e.target.value)
//   }
//   const [borrower,setBorrower]=useState("")
//   const borrowerHandler=(e)=>{
//     setBorrower(e.target.value)
//   }

  const handleClose = () => {
    props.handleClose();
    
  };
  const [returningbooks, setReturningBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    for (const key in data) {
      loadedBooks.push({
        id: key,
        book: data[key].book,
        issuedTo:data[key].borrower,
        status: data[key].status,
      });
    }
    setReturningBooks(loadedBooks);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBook = returningbooks.filter(
    (book) => book.status === "Issued"
  );

//   const bookIssueHandler = async(e) => {
//     e.preventDefault();
//     const issueBooks={
//       issueDate:issueDate,
//       book:book,
//       borrower:borrower,
//       status:"Issued"
//     }
//     const res=await fetch(
//       "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json",
//       {
//         method:"POST",
//         body:JSON.stringify(issueBooks),
//         headers:{
//           "Content-Type":"application/json",
//         }
//       }

//     )
//     const data=await res.json();
//     console.log(data)
//     alert(`"${book}" issued to ${borrower} successfully`)
//     props.handleClose()
//   };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form 
        // onSubmit={bookIssueHandler}
        >
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
            //   value={book}
              label="Select Book"
            //   onChange={issueBookHandler}
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
            //   value={borrower}
            //   label="Borrower"
            label="Returned from"
            //   onChange={borrowerHandler}
            >
              {filteredBook.map((book) => (
                <MenuItem key={book.id} value={book.issuedTo}>
                  {book.issuedTo}
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

export default ReturnBook;
