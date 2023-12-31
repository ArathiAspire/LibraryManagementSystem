"use client";

import React, { useState, useEffect } from "react";

function BookReturnEntryTable() {
  const [returnBooks, setReturnBooks] = useState([]);
  const fetchReturnBooks = async () => {
    const res = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/bookEntry.json"
    );
    const data=await res.json()
    const loadedBooks=[]
    let id=1;
    for(const key in data){
      loadedBooks.push({
        id:id,
        book:data[key.book],
        borrower: data[key].borrower,

      })
    }
  };
  return (
    <div className="w-full overflow-x-auto text-slate-900 p-8">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">SL No.</th>

            <th className="border p-2">Book ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Issued to</th>
            <th className="border p-2">Issued Date</th>
            <th className="border p-2">Returned Date</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default BookReturnEntryTable;
