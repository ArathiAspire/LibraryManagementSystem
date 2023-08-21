import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const DeleteModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    color: "#333",
  };
  const onDeleteHandler = async () => {
    const response = fetch(
      `https://librarymanagement-29ab2-default-rtdb.firebaseio.com/books/${props.bookId}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      console.log("Error while deleting");
    }

    toast("Book Deleted Successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });
    props.handleCloseModal();
  };
  const onCloseModal = () => {
    props.handleCloseModal();
  };
  return (
    <Box sx={style}>
      <Typography className="font-bold" id="modal-modal-title" component="h2">
        Delete Confirmation
      </Typography>
      <Divider></Divider>
      <Typography
        className="text-xs p-4 bg-red-100"
        id="modal-modal-description"
        sx={{ mt: 2 }}
      >
        Are you sure you want to delete the book?{" "}
      </Typography>
      <Divider />
      <div className="text-center p-2 text-xs">
        <button
          onClick={onDeleteHandler}
          className="bg-red-600 hover:bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
        <button
          onClick={onCloseModal}
          className=" hover:text-gray-600 text-gray-800 py-1 px-3 rounded-md"
        >
          Cancel
        </button>
      </div>
    </Box>
  );
};

export default DeleteModal;
