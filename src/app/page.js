import Link from "next/link";
import React from "react";
import backgroundImage from "public/backgroundHome.jpg";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <header className="flex justify-between items-center ">
        <Image src={backgroundImage} alt="" />
        {/* <Link className="border border-slate-300 text-slate-300 px-2 py 1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/Login">Login</Link> */}
      </header>
    </>
  );
};

export default Home;
