import React from "react";
import { NavLink } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-custom">
        <NavLink to="/">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand">
              <img src="/logo_pqaar.png" width="30" height="30" alt=""></img>
            </li>
            <li className="navbar-brand">Pqaar</li>
          </ul>
        </NavLink>
        <ul className="navbar-nav ml-auto">
          <LoggedInLinks />
          <LoggedOutLinks />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
