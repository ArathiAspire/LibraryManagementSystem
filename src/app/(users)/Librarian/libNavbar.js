"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
import {
  BsFillBookmarkDashFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddBook from "./BookList/AddBook/AddBookForm";
import IssueBook from "@/Components/IssueBook";
import ReturnBook from "@/Components/ReturnBook";

function LibNavbar() {
  const [openIssue, setOpenIssue] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const handleOpenIssueModal = () => {
    setOpenIssue(true);
  };
  const handleCloseIssueModal = () => {
    setOpenIssue(false);
  };
  const handleOpenReturnModal = () => {
    setOpenReturn(true);
  };
  const handleCloseReturnModal = () => {
    setOpenReturn(false);
  };
  return (
    <div>
      <nav>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/Librarian"
                >
                  <AiFillHome />
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/Librarian/BookList?LibLogged=true"
                >
                  <SiBookstack />
                  Books{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/Librarian/StudentList?Liblogged=true"
                >
                  <PiStudentBold />
                  Students{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/Librarian/BookTakenEntry?Liblogged=true"
                >
                  <BsFillBookmarkDashFill />
                  Book Taken Entry{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/Librarian/BookReturnEntry?Liblogged=true"
                >
                  <BsFillBookmarkCheckFill />
                  Book Return Entry{" "}
                </Link>
              </li>
              <li>
                <Button
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  onClick={handleOpenIssueModal}
                >
                <FaBookReader/>
                  Issue Book
                </Button>
              </li>
              {/* <li>
              <Link
                className="text-white hover:text-blue-300 items-center flex p-2"
                href="BookTakenEntry?Liblogged=true"
              >
                <BsFillBookmarkCheckFill />
                Issue Book{" "}
              </Link>
            </li> */}
            <li>
                <Button
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  onClick={handleOpenReturnModal}
                >
                 <BsFillBookmarkCheckFill />
                  Return Book
                </Button>
              </li>
              {/* <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="BookTakenEntry?Liblogged=true"
                >
                  <BsFillBookmarkCheckFill />
                  Return Book{" "}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <Modal open={openIssue} onClose={handleCloseIssueModal}>
        <div>
          <IssueBook handleClose={handleCloseIssueModal} />
        </div>
      </Modal>
      <Modal open={openReturn} onClose={handleCloseReturnModal}>
        <div>
          <ReturnBook handleClose={handleCloseReturnModal} />
        </div>
      </Modal>
    </div>
  );
}

export default LibNavbar;
