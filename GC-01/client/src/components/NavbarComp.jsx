import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import Logosneaker from "../assets/logo/Logo sneaker.png";
import useAuth from "../hook/useAuth";

function NavbarComp() {
  const { Logout } = useAuth();
  return (
    <div className="border-b-2 border-gray-800">
      <Navbar className="container mx-auto dark:bg-gray-white px-1.5 py-3 flex justify-between items-center">
        {/* <div> */}
        <NavbarBrand as={Link} to="/" className="flex items-center">
          <img src={Logosneaker} className="w-[36px]" />
          <h1 className="text-2xl md:text-3xl leading-1">Sneaker</h1>
        </NavbarBrand>
        {/* </div> */}
        <NavbarToggle />
        <NavbarCollapse className="*:flex *:items-center">
          <NavbarLink as={Link} to="/login">
            Login
          </NavbarLink>
          <NavbarLink as={Link} to="/register">
            Register
          </NavbarLink>
          <Button className="cursor-pointer" onClick={Logout} color="red">
            Register
          </Button>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
