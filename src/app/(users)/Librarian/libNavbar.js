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
import IssueBook from "@/Components/IssueBook";
import ModalReturnBook from "@/Components/ModalReturnBook";

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
                  href="/librarian"
                >
                  <AiFillHome />
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/librarian/bookList"
                >
                  <SiBookstack />
                  Books{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/librarian/studentList"
                >
                  <PiStudentBold />
                  Students{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/librarian/bookTakenEntry"
                >
                  <BsFillBookmarkDashFill />
                  Book Taken Entry{" "}
                </Link>
              </li>
              <li>
                <Link
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  href="/librarian/bookReturnEntry"
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
                  <FaBookReader />
                  Issue Book
                </Button>
              </li>

              <li>
                <Button
                  className="text-white hover:text-blue-300 items-center flex p-2"
                  onClick={handleOpenReturnModal}
                >
                  <BsFillBookmarkCheckFill />
                  Return Book
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal open={openIssue} onClose={handleCloseIssueModal}>
        <div>
          <IssueBook handleClose={handleCloseIssueModal} />
        </div>
      </Modal>

      {/* <Modal open={openReturn} onClose={handleCloseReturnModal}>
        <div>
          <ReturnBook handleClose={handleCloseReturnModal} />
        </div>
      </Modal> */}
      <Modal open={openReturn} onClose={handleCloseReturnModal}>
        <div>
          <ModalReturnBook handleClose={handleCloseReturnModal}/>{" "}
        </div>
      </Modal>
    </div>
  );
}

export default LibNavbar;
