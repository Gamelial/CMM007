import React from "react";
import { TopBar, Footer, AdminNav } from "../components";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminLayout = () => {
  let location = useLocation();
  return (
    <div className="bg-slate-50 min-h-screen">
      <TopBar admin="Admin" />
      <div className="min-h-screen lg:p-4 w-full">
        <div className="">
          {location.pathname.includes("admin") ? <AdminNav /> : null}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
