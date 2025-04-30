import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Logosneaker from "../assets/logo/Logo sneaker.png";
import useAuthFirebase from "../hook/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function NavbarComp() {
  const { Logout } = useAuthFirebase();
  const [user, setuser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(true);
      } else {
        setuser(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);
  return (
    <div className="border-b-2 border-gray-200">
      <Navbar className="container mx-auto dark:bg-gray-white px-1.5 py-3 flex justify-between items-center">
        {/* <div> */}
        <NavbarBrand as={Link} to="/" className="flex items-center">
          <img src={Logosneaker} className="w-[36px]" />
          <h1 className="text-2xl md:text-3xl leading-1">Sneaker</h1>
        </NavbarBrand>
        {/* </div> */}
        <NavbarToggle />
        <NavbarCollapse className="*:flex *:items-center">
          {user ? (
            <Button className="cursor-pointer" onClick={Logout} color="red">
              Logout
            </Button>
          ) : (
            <>
              {" "}
              <NavbarLink as={Link} to="/login">
                Login
              </NavbarLink>
              <NavbarLink as={Link} to="/register">
                Register
              </NavbarLink>
            </>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
