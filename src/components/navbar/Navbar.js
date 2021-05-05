import React from "react";
import { NavLink } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-custom">
        <NavLink to="/">
          <span className="navbar-brand">
            <img src="/logo_pqaar.png" width="30" height="30" alt=""></img>
            &nbsp;&nbsp;Pqaar
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <LoggedInLinks />
            <LoggedOutLinks />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
