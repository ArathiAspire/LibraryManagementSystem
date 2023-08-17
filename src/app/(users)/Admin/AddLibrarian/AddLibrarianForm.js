"use client";

import React, { useState } from "react";


const AddLibrarian = () => {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail=(event)=>{
    setEmail(event.target.value)
  }
  const handlePass=(event)=>{
    setPass(event.target.value)
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const librarian={
      name:name,
      pass:pass,
      email:email
    }
    const res = await fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/librarian.json",
      {
        method: "POST",
        body: JSON.stringify(librarian),
        headers: {
          "Content-Type": "appliaction/json",
        },
      }
    );
    const data=await res.json()
    console.log(data)
    toast("Added Successfully", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
      position: "top-center",
    });
    setEmail("")
    setName("")
    setPass("")
  };
  return (
    <div>
      <form onSubmit={handleAdd}>
        <div className="mb-4">
          <label className="block font-medium">Enter name</label>
          <input
          style={{color:'black'}}
            id="name"
            name="name"
            value={name}
            onChange={handleName}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Enter email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={handleEmail}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={pass}
            onChange={handlePass}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          // onClick={handleLogin}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddLibrarian;
