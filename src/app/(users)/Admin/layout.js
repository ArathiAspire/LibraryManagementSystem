
import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./AdminNavbar/AdminNavbar";

import { useSearchParams } from "next/navigation";


function layout({ children }) {
  return (
    <div className="flex justify-start items-start">
    
      <Sidebar/>
      {/* <AdminNavbar /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default layout;
