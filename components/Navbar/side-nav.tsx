"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { LOWER_SIDENAV_ITEMS, SIDENAV_ITEMS } from "@/constants/constants";
import { SideNavItem } from "@/types/Types";
import Image from "next/image";
import { Input } from "../ui/input";
import { useSideNavContext } from "@/context/useSideNavContext";

const SideNav = () => {
  const { showIconsOnly, toggleShowIconsOnly } = useSideNavContext();

  return (
    <div
      className={`md:w-[${
        showIconsOnly ? "4rem" : "20rem"
      }] max-w-[316px] bg-white h-screen flex-1 border-r border-zinc-200 hidden md:flex transition-all`}
    >
      <div className="flex flex-col space-y-6 gap-[11rem] w-full">
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row my-8 items-center justify-center md:justify-between md:px-6 h-12 w-full">
            {!showIconsOnly && (
              <input
                type="text"
                placeholder="Search for transaction"
                className="rounded-lg"
              />
            )}
            {showIconsOnly ? (
              <MdKeyboardDoubleArrowRight
                className=" text-xl"
                onClick={toggleShowIconsOnly}
              />
            ) : (
              <MdKeyboardDoubleArrowLeft
                className=" text-xl"
                onClick={toggleShowIconsOnly}
              />
            )}
          </div>

          <div className="flex flex-col space-y-2 gap-4 md:px-6 ">
            {SIDENAV_ITEMS.map((item, idx) => {
              return (
                <MenuItem key={idx} item={item} showIconsOnly={showIconsOnly} />
              );
            })}
          </div>
        </div>

        <div className="lower-subItems flex flex-col space-y-2 gap-4  md:px-6">
          {LOWER_SIDENAV_ITEMS.map((item, idx) => {
            return (
              <MenuItem key={idx} item={item} showIconsOnly={showIconsOnly} />
            );
          })}
          {!showIconsOnly && (
            <div className="users">
              <hr className=" h-[2px] my-4 w-full bg-slate-500 " />
              <div className=" flex justify-between items-center">
                <div className="user-details flex items-center space-x-2">
                  <span className=" bg-slate-900 rounded-full w-8 h-8   "></span>
                  <div className="user-details flex flex-col">
                    <h4 className="text-xs font-medium">User Name</h4>
                    <span className=" text-xs font-medium text-slate-600">
                      userid.@gmail.com
                    </span>
                  </div>
                </div>
                <div className="logout">
                  <Image
                    src="/icons/share-ios.svg"
                    alt="logout"
                    width={24}
                    height={24}
                    className=" cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({
  item,
  showIconsOnly,
}: {
  item: SideNavItem;
  showIconsOnly: boolean;
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
     
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          <Image src={`${item.icon}`} alt="icons" width={24} height={24} />
          <span
            className="font-normal text-sm flex"
            style={{ display: showIconsOnly ? "none" : "block" }}
          >
            {item.title}
          </span>
        </Link>
    </div>
  );
};
