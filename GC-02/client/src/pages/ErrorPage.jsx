import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      id="error-page"
      className="w-full h-screen space-y-4 flex flex-col justify-center items-center"
    >
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-lg">
        Sorry, an unexpected error has occurred.{" "}
        <span className="text-blue-500">
          <Link to="/">Go Back</Link>
        </span>
      </p>
    </div>
  );
}
