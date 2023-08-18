"use client";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const LoginForm = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const [adminLogged, setAdminLogged] = useState(false);
  const [librarianLogged, setLibrarianLogged] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        if (userEmail === "admin@gmail.com") {
          setAdminLogged(true);
        } else {
          setLibrarianLogged(true);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        if (email === "admin@gmail.com") {
          router.push("/admin");
          toast("Admin signed in successfully", {
            hideProgressBar: true,
            autoClose: 1000,
            type: "success",
            position: "top-center",
          });
        } else {
          toast("Librarian signed in successfully", {
            hideProgressBar: true,
            autoClose: 1000,
            type: "success",
            position: "top-center",
          });
          router.push("/librarian");
        }
      })
      .catch((error) => {
        toast("Error while signing in", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "error",
          position: "top-center",
        });
      });
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96  text-slate-900">
        <h4 className="text-2xl font-semibold mb-4">Login Page</h4>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium">Username</label>
            <input
              id="email"
              name="email"
              value={email}
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
            // onClick={() =>
            //   signIn("credentials", {
            //     email,
            //     password,
            //     redirect: true,
            //     callbackUrl: "/Admin",
            //   })
            // }
            disabled={!email || !password}
            type="submit"
            className="disabled:opacity-40 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          <button
            onClick={() => router.push("signup")}
            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
