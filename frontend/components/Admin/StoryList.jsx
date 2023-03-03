import React from "react";
import { UilMapMarkerAlt, UilEye, UilEditAlt } from "@iconscout/react-unicons";
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

const StoryList = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {storyList.map((story) => (
          <div
            key={story.id}
            className="gap-4 bg-slate-50 p-4 flex flex-col space-y-3  rounded-lg"
          >
            <a href="#" className="font-light font-ubuntu text-2xl">
              {story.title}
            </a>
            <p className="text-xl text-slate-500">{story.story}</p>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
