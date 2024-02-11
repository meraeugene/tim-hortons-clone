import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="px-4 py-16 md:px-20 md:pb-20">
      <div className="flex flex-col justify-center gap-2 md:items-center md:gap-4 ">
        {" "}
        <h1 className="text-9xl font-extrabold">404</h1>
        <h1 className="font-bold">Ooops! This page could not be found</h1>
        <p className="text-sm font-medium md:w-1/2 md:text-center lg:w-1/4">
          Sorry, but the page you are looking for does not exist, has been
          removed, name changed, or temporarily unavailable.
        </p>
        <div className="md:w-1/2 lg:w-1/4">
          <Link to="/" className="button__solid mt-2 md:mt-4">
            GO TO HOMEPAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
