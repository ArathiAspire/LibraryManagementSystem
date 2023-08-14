import React from "react";
import AddLibrarian from "./AddLibrarianForm";

const page = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96  text-slate-900">
        <h4 className="text-2xl font-semibold mb-4">Add librarian</h4>
        <AddLibrarian />
      </div>
    </div>
  );
};

export default page;
