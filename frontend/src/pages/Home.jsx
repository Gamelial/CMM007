import React from "react";
import { NavLink } from "react-router-dom";
import {
  UilEstate,
  UilCommentHeart,
  UilBookReader,
  UilEditAlt,
} from "@iconscout/react-unicons";

const routes = [
  { id: 1, name: "Admin Home", route: "/admin", icon: UilEstate },
  {
    id: 2,
    name: "Admin Stories",
    route: "/admin/stories/",
    icon: UilCommentHeart,
  },
  {
    id: 3,
    name: "Admin Readers",
    route: "/admin/readers/",
    icon: UilBookReader,
  },
  { id: 4, name: "Admin Writers", route: "/admin/writers/", icon: UilEditAlt },
  { id: 4, name: "Reader", route: "/reader", icon: UilEditAlt },
  { id: 4, name: "Writer", route: "/writer", icon: UilEditAlt },
  { id: 4, name: "Login", route: "/login", icon: UilEditAlt },
  { id: 4, name: "Signup", route: "/register", icon: UilEditAlt },
];

const Home = () => {
  return (
    <div className="mt-5 bg-slate-50 w-full min-h-[100vh] lg:max-h-screen lg:px-4">
      <div className="border-[1px] m-auto w-[90%] lg:w-full bg-white p-6 rounded-lg shadow-sm">
        <div className="flex gap-3 md:gap-5 lg:gap-10 items-center font-poppins font-semibold text-slate-600 flex-wrap leading-10">
          {routes.map((route) => (
            <div key={route.id} className="flex gap-2 items-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-emerald-600 flex gap-2 items-center"
                    : "text-slate-600 flex gap-2 items-center"
                }
                to={route.route}
                end
              >
                <route.icon />
                {route.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
