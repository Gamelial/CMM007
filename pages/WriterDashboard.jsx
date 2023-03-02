import React from "react";
import {
  UilMapMarkerAlt,
  UilEditAlt,
  UilTrashAlt,
  UilEye,
} from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";

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
const WriterDashBoard = () => {
  let navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6">
          <div>
            <ul className="text-xl lg:text-2xl font-semibold">
              <div className="flex flex-col lg:flex-row gap:2 lg:gap-4 items-start lg:items-center text-xs ">
                <li className="text-xl lg:text-2xl font-semibold">
                  <div className="flex gap:2 lg:gap-4 items-center">
                    <p className="text-slate-900">
                      My Stories - <span>23</span>
                    </p>
                  </div>
                </li>
                <span className="hidden lg:block">|</span>
                <li className="text-slate-500 underline underline-offset-2">
                  <Link to="/writer/stories">View All Stories</Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/writer/stories/add");
              }}
              className="rounded-full px-3 py-1 flex items-center gap-2 text-sm border-[1px] border-slate-600 hover:bg-slate-100"
            >
              <UilEditAlt className="h-5 w-5" /> Add New Story
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5">
          {storyList.map((story) => (
            <div
              key={story.id}
              className="flex flex-col gap-2 p-2 bg-slate-50 h-24 border-[1px] rounded-md"
            >
              <a href="#" className="font-light font-ubuntu text-sm lg:text-xl">
                {story.title}
              </a>
              <p className="text-sm text-slate-500 truncate">{story.story}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <UilMapMarkerAlt className="h-4 w-4 text-slate-400" />
                    <p className="text-xs">{story.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <UilEye className="h-4 w-4 text-slate-400" />
                    <p className="text-xs">{story.views}</p>
                  </div>
                </div>

                <div className="flex gap-2 lg:gap-4">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={(e) => confirm("Do you want to Read this Story?")}
                  >
                    <UilEye className="h-4 w-4 text-slate-400" />
                  </div>
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={(e) => confirm("Do you want to Edit this Story?")}
                  >
                    <UilEditAlt className="h-4 w-4 text-slate-400" />
                  </div>
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={(e) =>
                      confirm("Do you want to Delete this Story?")
                    }
                  >
                    <UilTrashAlt className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WriterDashBoard;
