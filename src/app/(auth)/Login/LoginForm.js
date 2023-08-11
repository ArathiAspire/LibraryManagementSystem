"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === "admin@gmail.com" && password === "admin") {
      alert("Logged In Successfully");
      router.push('/Admin')
    } else {
      alert("Enter valid credentials");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block font-medium">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={usernameHandler}
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
          value={password}
          onChange={passwordHandler}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        // onClick={handleLogin}
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
