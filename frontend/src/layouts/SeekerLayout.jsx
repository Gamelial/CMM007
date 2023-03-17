import React from "react";
import { TopBar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const ReaderDashboard = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 min-h-screen">
      <TopBar />
      <div className="min-h-screen lg:p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ReaderDashboard;
