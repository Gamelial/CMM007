import React from "react";
import { NavLink } from "react-router-dom";
import {
  UilEstate,
  UilCommentHeart,
  UilBookReader,
  UilEditAlt,
} from "@iconscout/react-unicons";

const routes = [
  { id: 1, name: "Home", route: "/admin", icon: UilEstate },
  { id: 2, name: "Stories", route: "/admin/stories/", icon: UilCommentHeart },
  { id: 3, name: "Readers", route: "/admin/readers/", icon: UilBookReader },
  { id: 4, name: "Writers", route: "/admin/writers/", icon: UilEditAlt },
];

const AdminNav = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 md:gap-5 lg:gap-10 items-center font-poppins font-semibold text-slate-600">
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
  );
};

export default AdminNav;
