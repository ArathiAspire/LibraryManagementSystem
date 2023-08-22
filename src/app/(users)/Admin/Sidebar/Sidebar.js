"use client"

import React, { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdLibraryAdd,MdPersonAddAlt1 } from "react-icons/md";
import Link from "next/link";

function Sidebar() {
    return (
      <aside className="bg-gray-900 text-slate-100 w-60 h-screen p-4">
      <ul>
        <li className="flex justify-start items-center hover:bg-gray-200 hover:text-slate-800 p-2 ">
          <AiOutlineHome className="mr-2" />
          <Link href="/admin">Home</Link>
        </li>
        <li className="flex justify-start items-center hover:bg-gray-200 hover:text-slate-800 p-2 ">
          <PiUsersThreeFill className="mr-2" />
          <Link href="/admin/studentList">View Students</Link>
        </li>
      
        <li className="flex justify-start items-center hover:bg-gray-200 hover:text-slate-800 p-2 ">
          <MdPersonAddAlt1 className="mr-2" />
          <Link href="/admin/addLibrarian">Add Librarian</Link>
        </li>
        
      </ul>
    </aside>
      );
}

export default Sidebar