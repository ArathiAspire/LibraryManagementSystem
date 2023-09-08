import React from "react";
import AddLibrarian from "./AddLibrarianForm";
const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-2 shadow-md text-slate-900" style={{ width: "500px" }}>
        {/* <h4 className="text-2xl font-semibold mb-4">Add librarian</h4> */}
        <AddLibrarian />
      </div>
    </div>
  );
};

export default page;
