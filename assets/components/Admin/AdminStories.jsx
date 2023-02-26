import React from "react";
import {
  UilMapMarkerAlt,
  UilEditAlt,
  UilTrashAlt,
  UilEye,
  UilSort,
} from "@iconscout/react-unicons";
import { CustomSelect } from "@/components";

const storyList = [
  {
    id: 1,
    title: "Lorem Ipsum 1",
    location: "London",
    views: 434,
    story:
      "Story List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaquaut aliquid blanditiis nam suscipit eius beatae rerum fugit? Ipsam vitaevoluptatibus possimus non exercitationem asperiores tenetur pariatur\
aliquam saepe error",
  },
  {
    id: 2,
    title: "Lorem Ipsum 2",
    location: "Lagos",
    views: 44,
    story:
      "Story List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaquaut aliquid blanditiis nam suscipit eius beatae rerum fugit? Ipsam vitaevoluptatibus possimus non exercitationem asperiores tenetur pariatur\
aliquam saepe error",
  },
  {
    id: 3,
    title: "Lorem Ipsum 3",
    location: "Owerri",
    views: 34,
    story:
      "Story List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaquaut aliquid blanditiis nam suscipit eius beatae rerum fugit? Ipsam vitaevoluptatibus possimus non exercitationem asperiores tenetur pariatur\
aliquam saepe error",
  },
  {
    id: 4,
    title: "Lorem Ipsum 4",
    location: "Owerri",
    views: 354,
    story:
      "Story List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaquaut aliquid blanditiis nam suscipit eius beatae rerum fugit? Ipsam vitaevoluptatibus possimus non exercitationem asperiores tenetur pariatur\
aliquam saepe error",
  },
  {
    id: 5,
    title: "Lorem Ipsum 5",
    location: "Owerri",
    views: 14,
    story:
      "Story List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaquaut aliquid blanditiis nam suscipit eius beatae rerum fugit? Ipsam vitaevoluptatibus possimus non exercitationem asperiores tenetur pariatur\
aliquam saepe error",
  },
];

const AdminStories = () => {
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 py-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6">
          <div>
            <ul className="text-xl lg:text-2xl font-semibold">
              <div className="flex flex-col lg:flex-row gap:2 lg:gap-4 items-start lg:items-center text-xs ">
                <li className="text-slate-500 underline underline-offset-2">
                  View All Stories
                </li>
                <li className="text-slate-500 underline underline-offset-2">
                  View Story Tellers
                </li>
                <li className="text-slate-500 underline underline-offset-2">
                  View All Readers
                </li>
              </div>
            </ul>
          </div>
          <div>
            <div className="flex items-center">
              <UilSort className="h-5 lg:h-8 w-5 text-slate-900" />
              <CustomSelect />
            </div>
          </div>
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold">
          <h3 className="text-xl lg:text-2xl font-bold">All Stories</h3>
        </div>
        <div className="flex flex-col gap-4 p-4 px-6">
          {storyList?.map((story, index) => (
            <div
              key={index + 1}
              className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5 bg-slate-50 border-[1px] rounded-md"
            >
              <div className="space-y-4 h-20  text-xl lg:text-2xl">
                <a
                  href="#"
                  className="font-light font-ubuntu text-xl lg:text-2xl"
                >
                  {story.title}
                </a>
                <p className="text-sm truncate">{story.story}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="font-poppins text-sm flex items-center gap-1 text-slate-500">
                    <UilEye className="h-5 w-5" /> {story.views}
                  </p>
                  <p className="font-poppins text-sm flex items-center gap-1 text-slate-500">
                    <UilMapMarkerAlt className="h-5 w-5" /> {story.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-poppins text-sm flex items-center gap-1 text-slate-500">
                    <UilEditAlt className="h-5 w-5" /> edit
                  </p>
                  <p className="font-poppins text-sm flex items-center gap-1 text-slate-500">
                    <UilTrashAlt className="h-5 w-5" /> delete
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStories;
