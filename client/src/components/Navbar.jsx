import React from "react";
import { Link } from "react-router-dom";
import logoLight from "../assets/transparentLogoLight.png";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 flex items-center justify-between px-4 py-1 bg-(--color-primary) text-white w-full h-16 shadow-md">
        <div className="h-full">
          <Link to="/">
            <img src={logoLight} alt="Logo" className="w-fit h-full" />{" "}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-(--color-primary-content) border border-transparent hover:border-(--color-primary-content) px-3 py-1 rounded"
          >
            Login
          </Link>
          <Link
            to="/register/customer"
            className="bg-(--color-primary-content) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-content) border px-3 py-1 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
