import React from "react";
import { TopBar, Footer } from "../components";
import { Outlet, NavLink } from "react-router-dom";
const navList = [
  {
    id: 1,
    link: "/writer",
    name: "My Stories",
  },
  {
    id: 2,
    link: "/writer/stories",
    name: "Other Stories",
  },
  {
    id: 3,
    link: "/writer/stories/add",
    name: "Write Story",
  },
];

const WriterLayout = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar />
      <div className="min-h-screen p-4 lg:p-4">
        <ul className="flex items-center gap-4 font-semibold">
          {navList.map((nav, index) => (
            <div key={index}>
              <NavLink
                to={nav.link}
                className={({ isActive }) => {
                  return isActive
                    ? "text-indigo-500 underline underline-offset-8"
                    : "text-slate-600";
                }}
                end
              >
                {nav.name}
              </NavLink>
            </div>
          ))}
        </ul>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WriterLayout;
