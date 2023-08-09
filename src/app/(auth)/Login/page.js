"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/Admin");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96  text-slate-900">
        <h4 className="text-2xl font-semibold mb-4">Login Page</h4>
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
      </div>
    </div>
   
  );
}
