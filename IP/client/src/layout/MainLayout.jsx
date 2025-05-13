import React from "react";
import NavbarComp from "../components/NavbarComp";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
}

export default MainLayout;
