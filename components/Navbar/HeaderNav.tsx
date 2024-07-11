"use client";
import { HEADER_NAV } from "@/constants/constants";
import { HeaderNavItem } from "@/types/Types";
import { BorderBottom } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const HeaderNav = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className={` flex-1 flex transition-all mb-6 gap-8 items-center`}>
      <div className="flex items-center gap-4 ">
        {HEADER_NAV.map((item, idx) => (
          <div key={idx}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path ? "text-black" : "text-disabledText"
              } pb-3`}
            >
              {item.navItem}
            </Link>
            <span
              style={{
                backgroundColor: "black",
                width: "117%",
                display: "block",
                height: `${pathname === item.path ? "4px" : "2px"}`,
                transform: "rotate(180deg)",
                marginTop: "7px",
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderNav;
