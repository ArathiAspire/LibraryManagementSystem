import React from "react";
import LibNavbar from "./libNavbar";
import BookList from "./BookList/page";
import BookListTable from "@/app/BookList/BookListTable";

function layout({ children }) {
  return (
    <div>
      <h1 className="mx-auto p-4">Librarian Home Page</h1>
      <div className="bg-gray-900 text-white p-4 text-center mx-auto">
        <LibNavbar />
      </div>
      {children}
    </div>
  );
}

export default layout;
