import React, { useEffect } from "react";
import NavbarComp from "../components/NavbarComp";
import { Outlet } from "react-router-dom";

function MainLayout() {
  useEffect(() => {
    console.log("first");
  }, []);
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
}

export default MainLayout;
