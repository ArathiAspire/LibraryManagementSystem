import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl mx-auto p-4">Home Page</h1>
        {/* <Link className="border border-slate-300 text-slate-300 px-2 py 1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/Login">Login</Link> */}
      </header>
    </>
  );
};

export default Home;
