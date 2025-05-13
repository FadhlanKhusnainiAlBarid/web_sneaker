import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import Swal from "sweetalert2";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const Register = async (name, email, password, confPassword) => {
    try {
      if (password !== confPassword) {
        console.log(password, confPassword);
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
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // add data user to collection users
      await setDoc(doc(db, "users", response.user.uid), {
        name: name,
        email: email,
        role: "customer",
      });
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
      const response = await signInWithPopup(auth, provider);

      const checkUser = await getDoc(doc(db, "users", response.user.uid));

      if (!checkUser.data()) {
        await setDoc(doc(db, "users", response.user.uid), {
          name: response.user.displayName,
          email: response.user.email,
          role: "customer",
        });
      }
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
