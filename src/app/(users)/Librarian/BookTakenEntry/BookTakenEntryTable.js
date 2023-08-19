"use client";

import React, { useState, useEffect } from "react";

function BookTakenEntryTable() {
  const [issueBooks, setIssueBooks] = useState([]);
  const fetchIssueBooks = async () => {
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
    );
    const data = await response.json();
    const loadedBooks = [];
    let id = 1;
    for (const key in data) {
      loadedBooks.push({
        id: id,
        book: data[key].book,
        borrower: data[key].borrower,
        issueDate: data[key].issueDate,
        status: data[key].status,
        returnDate: data[key].returnDate,
      });
      id++;
    }

    setIssueBooks(loadedBooks);
  };
  useEffect(() => {
    fetchIssueBooks();
  }, [issueBooks]);
  return (
    <div className="w-full overflow-x-auto text-slate-900 p-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">SL No.</th>
            <th className="border p-2">Book</th>
            <th className="border p-2">Issued to</th>
            <th className="border p-2">Issued Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Returned Date</th>

          </tr>
        </thead>
        <tbody>
          {issueBooks.map((book) => (
            <tr key={book.id} className="text-slate-200">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.book}</td>
              <td className="border p-2">{book.borrower}</td>
              <td className="border p-2">{book.issueDate}</td>
              <td className="border p-2">{book.status}</td>
              <td className="border p-2">{book.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTakenEntryTable;
