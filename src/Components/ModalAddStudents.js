"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const ModalAddStudents = (props) => {
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");
  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleContact = (event) => {
    setContact(event.target.value);
  };
  const handleDept = (event) => {
    setDept(event.target.value);
  };
  const handleBatch = (event) => {
    setBatch(event.target.value);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/students.json"
    );
    const data = await response.json();
    var flag = false;
    for (const key in data) {
      if (data[key].email === email) {
        flag = true;
        toast("student email already registered", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "warning",
          position: "bottom-left",
        });

        setBatch("");
        setContact("");
        setDept("");
        setEmail("");
        setFname("");
        setLname("");
        break;
      }
    }

    if (!flag) {
      const students = {
        fname: fname,
        lname: lname,
        dept: dept,
        batch: batch,
        contact: contact,
        email: email,
      };
      const res = await fetch(
        "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/students.json",
        {
          method: "POST",
          body: JSON.stringify(students),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const datas = await res.json();
      console.log(datas);
      toast("Student Added Successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "bottom-left",
      });

      setBatch("");
      setContact("");
      setDept("");
      setEmail("");
      setFname("");
      setLname("");
      props.handleCloseModal();
    }
  };
  const handleClose = () => {
    props.handleCloseModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddStudent}>
          <h3 className="text-blue-900 font-bold mx-auto py-5 ">Add Student</h3>
          <TextField
            id="standard-full-width"
            placeholder="Enter First name"
            name="fname"
            value={fname}
            label="Enter first name"
            onChange={handleFname}
            required
            fullWidth
            className="py-3"
          />

          <TextField
            id="standard-full-width"
            placeholder="Enter last name"
            name="lname"
            value={lname}
            label="Enter last name"
            onChange={handleLname}
            required
            fullWidth
            className="py-3"
          />
          <TextField
            name="email"
            value={email}
            onChange={handleEmail}
            id="standard-full-width"
            placeholder="Enter Book Genre"
            label="Enter Email"
            required
            fullWidth
            className="py-3"
          />
          <TextField
            id="standard-full-width"
            placeholder="Enter Department"
            name="dept"
            value={dept}
            label="Enter Department"
            onChange={handleDept}
            required
            fullWidth
            className="py-3"
          />

          <TextField
            id="standard-full-width"
            placeholder="Enter batch"
            name="batch"
            value={batch}
            label="Enter batch"
            onChange={handleBatch}
            required
            fullWidth
            className="py-3"
          />
          <TextField
            name="contact"
            value={contact}
            onChange={handleContact}
            id="standard-full-width"
            placeholder="Enter Book Genre"
            label="Enter Contact"
            required
            fullWidth
            className="py-3"
          />
          <div className="flex justify-center space-x-4">
            <Button type="submit" variant="outlined" color="primary">
              Add
            </Button>

            <Button variant="outlined" color="info" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddStudents;
