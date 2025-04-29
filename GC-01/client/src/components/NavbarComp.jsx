import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";

function NavbarComp() {
  return (
    <div className="border-b-2 border-gray-800">
      <Navbar className="px-1.5 py-3 flex justify-between items-center">
        {/* <div> */}
        <NavbarBrand as={Link} to="/">
          <h1 className="text-2xl md:text-3xl">Sneaker</h1>
        </NavbarBrand>
        {/* </div> */}
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} to="/login">
            Login
          </NavbarLink>
          <NavbarLink as={Link} to="/register">
            Register
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
