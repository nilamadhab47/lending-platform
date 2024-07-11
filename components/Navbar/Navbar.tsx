import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center py-3 px-[82px] bg-black">
      <div className="logo">
        <Image src="/images/logo.png" alt="logo" width={198} height={47} />
      </div>
      <div className="nav-items">
        <nav>
            <Link href="/" className=" text-lg text-white font-normal">Home</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
