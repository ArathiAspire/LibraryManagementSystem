import Link from "next/link";
import React from "react";

function AdminNavbar() {
  return (
    <div>
      <h1 className="text-slate-100 mx-auto p-4 ">Admin Home Page</h1>{" "}
      <li className="mb-2">
        <Link href="/Admin?LoggedIn=true" className="hover:text-blue-500">
          Home
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/Admin/StudentList?LoggedIn=true"
          className="hover:text-blue-500"
        >
          View Students
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/Admin/BookList?LoggedIn=true"
          className="hover:text-blue-500"
        >
          Add Books
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/Admin/AddLibrarian?LoggedIn=true"
          className="hover:text-blue-500"
        >
          Add Librarian
        </Link>
      </li>
    </div>
  );
}

export default AdminNavbar;
