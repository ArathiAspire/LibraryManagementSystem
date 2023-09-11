"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/app/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
// import setLibrarianRole from "@/setClaims";

export default function AddLibrarian() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();

  const signupHandler = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const uid = user.uid;
      console.log("====================================");
      console.log(uid);
      console.log("====================================");

      // const response = await axios.post("../../../../api/setLibrarianRole", {
      //   uid,
      // });

      toast("Added librarian successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "top-center",
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPasswordAgain("");
      setPhone("");

      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        role:'librarian'
      };
      fetch(
        "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/userDetails.json",
        {
          method: "POST",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("====================================");
      console.log("Error", error);
      console.log("====================================");
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-2 py-12 lg:px-8 bg-gray-900">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Add Librarian
        </h2>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div className="flex flex-1 flex-row">
              <div className="mr-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    autoComplete="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-row">
              <div className="mr-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    value={phone}
                    autoComplete="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password Again
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                onClick={signupHandler}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
