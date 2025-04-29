import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import LogoSneaker from "../assets/logo/Logo sneaker.png";
import useAuth from "../hook/useAuth";

function Register() {
  const { error, seterror, Register } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  useEffect(() => {
    seterror(false);
  }, []);
  return (
    <div className="lg:flex h-[calc(100vh-66px)]">
      <div className="hidden lg:flex lg:justify-center items-center w-full h-full bg-amber-500">
        <img
          src={LogoSneaker}
          className="md:w-1/2 lg:w-2/3 drop-shadow-2xl drop-shadow-amber-200"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Register(email, password, confPassword);
          }}
          className="md:w-1/2 lg:w-2/3 space-y-5"
        >
          <div>
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium">
              Register to your Account
            </h1>
            <p className="text-xs md:text-base xl:text-lg">
              See what is going on with your business
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="email1"
                  className="text-xs md:text-base xl:text-lg"
                  color={error.email ? "failure" : "gray"}
                >
                  Your email
                </Label>
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="mail@abc.com"
                color={error.email ? "failure" : "gray"}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="password1"
                  className="text-xs md:text-base xl:text-lg"
                  color={error.password ? "failure" : "gray"}
                >
                  Password
                </Label>
              </div>
              <TextInput
                id="password1"
                type="password"
                color={error.password ? "failure" : "gray"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="password2"
                  className="text-xs md:text-base xl:text-lg"
                  color={error.confPassword ? "failure" : "gray"}
                >
                  Confirm password
                </Label>
              </div>
              <TextInput
                id="password2"
                type="password"
                color={error.confPassword ? "failure" : "gray"}
                value={confPassword}
                onChange={(e) => setconfPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="cursor-pointer w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
