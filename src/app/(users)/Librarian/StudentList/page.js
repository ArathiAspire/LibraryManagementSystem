"use client";
import { use, useState } from "react";
import StudentListTable from "../../../../Components/StudentListTable";
import { students } from "@/api/students";
import { Button, Modal } from "@mui/material";
import ModalAddStudents from "@/Components/ModalAddStudents";

const StudentList = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const onAddStudentHandler = () => {
    handleOpenModal();
  };
  return (
    <div className="p-5 bg-gray-900">
      <h1 className="text-2xl font-semibold mb-4 text-center">Student List</h1>
      <div className="text-center p-4">
        <Button
          color="primary"
          variant="contained"
          className="text-center bg-gray"
          onClick={onAddStudentHandler}
        >
          Add Students
        </Button>
      </div>
      <StudentListTable students={students} />
      <Modal open={open} onClose={handleCloseModal}>
        <ModalAddStudents handleCloseModal={handleCloseModal}/>
      </Modal>
    </div>
  );
};

export default StudentList;
