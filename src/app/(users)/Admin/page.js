"use client";

import BookListTable from "@/Components/BookListTable";
import ModalAddBook from "@/Components/ModalAddBook";
import { Button, Modal } from "@mui/material";
import { useState } from "react";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const handleOpenAddBookModal = () => {
    setOpen(true);
  };
  const handleCloseAddBookModal = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <div className="px-10 py-10">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleOpenAddBookModal}
        >
          Add Book
        </button>{" "}
      </div>

      <BookListTable />
      <Modal open={open} onClose={handleCloseAddBookModal}>
        <ModalAddBook handleCloseAddBookModal={handleCloseAddBookModal}/>
      </Modal>
    </div>
  );
}
