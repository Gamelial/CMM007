import React from "react";
import { UilSignOutAlt, UilUserCircle } from "@iconscout/react-unicons";
import { useLocation } from "react-router-dom";

const TopBar = ({ admin }) => {
  let location = useLocation();

  return (
    <div className="h-20 w-full flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="font-ubuntu font-bold text-2xl md:text-3xl lg:text-4xl">
        Story{" "}
        {!admin
          ? location.pathname.includes("writer")
            ? "Writer"
            : "Reader"
          : "Admin"}
      </div>
      <ul className="flex items-center gap-3">
        <li>
          <button className="rounded-full px-3 py-1 flex items-center gap-2 text-sm border-[1px] border-slate-600 hover:bg-slate-100">
            <UilSignOutAlt className="h-5 w-5" /> Logout
          </button>
        </li>
        <li>
          <UilUserCircle className="h-10 w-10 hover:text-slate-500 cursor-pointer" />
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
