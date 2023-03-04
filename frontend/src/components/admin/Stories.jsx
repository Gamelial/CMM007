import React from "react";
import { UilSort } from "@iconscout/react-unicons";
import { CustomSelect, StoryList } from "../components";

const Stories = () => {
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-center p-4 px-6">
          <h2 className="font-black text-3xl">Stories</h2>
          <div className="flex items-center">
            <UilSort className="h-5 lg:h-8 w-5 text-slate-900" />
            <CustomSelect />
          </div>
        </div>
        <StoryList />
      </div>
    </div>
  );
};

export default Stories;
