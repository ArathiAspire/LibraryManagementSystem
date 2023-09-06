import React from "react";
import Sidebar from "./Sidebar/Sidebar";

function layout({ children }) {
  return (
    <div className="flex justify-start items-start">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

export default layout;
