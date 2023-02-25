import React from "react";
import { UilEditAlt, UilUserCircle } from "@iconscout/react-unicons";

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Done 1",
    username: "user1",
    role: "reader",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Done 2",
    username: "user2",
    role: "reader",
  },
  {
    id: 3,
    firstName: "Mattew",
    lastName: "Done 3",
    username: "user3",
    role: "reader",
  },
  {
    id: 4,
    firstName: "Mike",
    lastName: "Done 4",
    username: "user4",
    role: "reader",
  },
];
const AdminReaderList = () => {
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
            <button className="rounded-full px-3 py-1 flex items-center gap-2 text-sm border-[1px] border-slate-600 hover:bg-slate-100">
              <UilEditAlt className="h-5 w-5" /> Add New Story
            </button>
          </div>
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold">
          <h3 className="text-xl lg:text-2xl font-bold">All Readers</h3>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5"
          >
            <div className="flex justify-between items-center gap-2 px-2 lg:px-4 bg-slate-50 h-24 border-[1px] rounded-md text-xl lg:text-2xl">
              <a
                href="#"
                className="font-light font-ubuntu text-xl lg:text-2xl flex gap-3 items-center"
              >
                {/* Replace icon with user Image */}
                <UilUserCircle /> {user.firstName} {user.lastName}
              </a>
              <p className="font-poppins">{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReaderList;
