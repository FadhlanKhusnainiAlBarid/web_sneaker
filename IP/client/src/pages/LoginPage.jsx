import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import LogoSneaker from "../assets/logo/Logo sneaker.png";
import useAuthFirebase from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { user, loading } = useContext(AuthContext);

  const { error, seterror, Login, handleLoginGoogle } = useAuthFirebase();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    seterror({
      email: false,
      password: false,
      confPassword: false,
    });
  }, []);

  useEffect(() => {
    if (user && !loading) {
      navigate("/admin");
    }
  }, [navigate, user, loading]);
  return (
    <div className="lg:flex h-[calc(100vh-66px)]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Login(email, password);
          }}
          className="md:w-1/2 lg:w-2/3 space-y-5"
        >
          <div>
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium">
              Login to your Account
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
          </div>
          <Button type="submit" className="cursor-pointer w-full h-12 text-lg">
            Login
          </Button>
          <Button
            onClick={handleLoginGoogle}
            className="flex cursor-pointer w-full h-12 text-lg gap-1.5"
          >
            <img
              className="w-9 drop-shadow-sm drop-shadow-black/50"
              src="https://img.icons8.com/?size=512&id=V5cGWnc9R4xj&format=png"
              alt="google icon"
            />
            Login with Google
          </Button>
        </form>
      </div>
      <div className="hidden lg:flex lg:justify-center items-center w-full h-full bg-amber-500">
        <img
          src={LogoSneaker}
          className="md:w-1/2 lg:w-2/3 drop-shadow-2xl drop-shadow-amber-200"
        />
      </div>
    </div>
  );
}

export default Login;
