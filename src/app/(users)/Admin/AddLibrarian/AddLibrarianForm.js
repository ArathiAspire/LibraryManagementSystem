"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/app/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddLibrarian() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();

  const signupHandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast("Added librarian successfully", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "success",
          position: "top-center",
        });
        router.push("/signin");
      })
      .catch((error) => {
        console.log("Error creating user");
      });
    const librarianDetails = {
      firstName: firstName,
      lastName: lastName,
      phone:phone,
      email: email,
    };
    fetch(
      "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/librarianDetails.json",
      {
        method: "POST",
        body: JSON.stringify(librarianDetails),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

// "use client";

// import React, { useState } from "react";

// const AddLibrarian = () => {
//   const [name, setName] = useState("");
//   const [email,setEmail]=useState("")
//   const [pass,setPass]=useState("")
//   const handleName = (event) => {
//     setName(event.target.value);
//   };
//   const handleEmail=(event)=>{
//     setEmail(event.target.value)
//   }
//   const handlePass=(event)=>{
//     setPass(event.target.value)
//   }
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     const librarian={
//       name:name,
//       pass:pass,
//       email:email
//     }
//     const res = await fetch(
//       "https://librarymanagement-29ab2-default-rtdb.firebaseio.com/librarian.json",
//       {
//         method: "POST",
//         body: JSON.stringify(librarian),
//         headers: {
//           "Content-Type": "appliaction/json",
//         },
//       }
//     );
//     const data=await res.json()
//     console.log(data)
//     toast("Added Successfully", {
//       hideProgressBar: true,
//       autoClose: 1000,
//       type: "success",
//       position: "top-center",
//     });
//     setEmail("")
//     setName("")
//     setPass("")
//   };
//   return (
//     <div>
//       <form onSubmit={handleAdd}>
//         <div className="mb-4">
//           <label className="block font-medium">Enter name</label>
//           <input
//           style={{color:'black'}}
//             id="name"
//             name="name"
//             value={name}
//             onChange={handleName}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium">Enter email</label>
//           <input
//             id="email"
//             name="email"
//             value={email}
//             onChange={handleEmail}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             value={pass}
//             onChange={handlePass}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <button
//           // onClick={handleLogin}
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
//         >
//           Add
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddLibrarian;
