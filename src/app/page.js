import Link from "next/link";
import React from "react";
import backgroundImage from "public/home3.jpg";
import Image from "next/image";
import styles from "./(auth)/signin/signin.module.css";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <>
      <header
        className={`${styles.loginBackground} justify-between items-center p-8`}
      >
        <div
          className={`bg-gray-300 bg-opacity-30 rounded-lg shadow-md absolute inset-40 justify-center items-center py-4`}
        >
          <h1 className="text-3xl font-bold mb-4 text-center text-white">
            Welcome to Online Library
          </h1>
          <div className="text-center text-white  text-l p-4">
            <p className="font-bold italic">Sign in as</p>
            <div className="mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2">
                <Link href="/signin">Admin</Link>
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md">
                <Link href="/signin">Librarian</Link>
              </button>
            </div>
            <p className="italic">new user?</p>
            <Link className="text-gray-300" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
        <Image src={backgroundImage} alt="" width="2000" />
      </header>
    </>
  );
};

export default Home;
