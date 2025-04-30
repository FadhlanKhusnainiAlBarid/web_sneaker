import React from "react";
import NavbarComp from "../components/NavbarComp";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <NavbarComp />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
