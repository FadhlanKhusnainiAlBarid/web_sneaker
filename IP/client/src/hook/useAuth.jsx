import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../config/firebase";
import Swal from "sweetalert2";

function useAuthFirebase() {
  const [error, seterror] = useState({
    email: false,
    password: false,
    confPassword: false,
  });
  const navigate = useNavigate();
  const Login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Success Login",
        text: "Success Login account!",
        icon: "success",
      });
      navigate("/admin");
    } catch (error) {
      let errorMessage;
      if (error.message.includes("(auth/invalid-credential)")) {
        seterror((prev) => {
          return {
            ...prev,
            password: true,
          };
        });
        errorMessage = "Password should be at least 6 characters!";
      } else if (error.message.includes("(auth/user-disabled)")) {
        seterror((prev) => {
          return {
            ...prev,
            email: true,
          };
        });
        errorMessage = "The user account has been disabled by the admin!";
      } else {
        errorMessage = error.message;
      }
      Swal.fire({
        title: "Fail",
        text: "Fail Login account!",
        icon: "error",
      });
    }
  };
  const Register = async (email, password, confPassword) => {
    seterror({ email: false, password: false, confPassword: false });
    try {
      if (password !== confPassword) {
        seterror((prev) => {
          return { ...prev, confPassword: true };
        });
        Swal.fire({
          title: "Fail Login",
          text: "Confirm Password should same with Password!",
          icon: "error",
        });
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Success",
        text: "Success Login account!",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      let errorMessage;
      if (error.message.includes("(auth/weak-password)")) {
        seterror((prev) => {
          return {
            ...prev,
            password: true,
            confPassword: true,
          };
        });
        errorMessage = "Password should be at least 6 characters!";
      } else if (error.message.includes("(auth/email-already-in-use)")) {
        seterror((prev) => {
          return {
            ...prev,
            email: true,
          };
        });
        errorMessage = "Email has been registered, please use another email!";
      } else {
        errorMessage = error.message;
      }
      Swal.fire({
        title: "Fail Login",
        text: `${errorMessage}`,
        icon: "error",
      });
    }
  };
  const Logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        title: "Success Login",
        text: "Success Login account!",
        icon: "success",
      });
      navigate("/admin");
    } catch (error) {
      console.log(error.code);
    }
  };

  return { error, seterror, Login, Register, Logout, handleLoginGoogle };
}

export default useAuthFirebase;
