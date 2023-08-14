"use client"

import React, { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdLibraryAdd,MdPersonAddAlt1 } from "react-icons/md";
import Link from "next/link";

function Sidebar() {
    return (
      <aside className="bg-white text-slate-900 rounded-lg w-60 p-4">
      <ul>
        <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 ">
          <AiOutlineHome className="mr-2" />
          <Link href="/Admin?LoggedIn=true">Home</Link>
        </li>
        <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 ">
          <PiUsersThreeFill className="mr-2" />
          <Link href="/Admin/StudentList?LoggedIn=true">View Students</Link>
        </li>
        <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 ">
          <MdLibraryAdd className="mr-2" />
          <Link href="/Admin/BookList?LoggedIn=true">View Books</Link>
        </li>
        <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 ">
          <MdPersonAddAlt1 className="mr-2" />
          <Link href="/Admin/AddLibrarian?LoggedIn=true">Add Librarian</Link>
        </li>
        
      </ul>
    </aside>
      );
}

export default Sidebar