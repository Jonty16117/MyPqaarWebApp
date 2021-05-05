import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOutLinks = () => {
  let loginButton = (
    <NavLink to="/login">
      <li className="nav-item">
        <a className="nav-link">Login</a>
      </li>
    </NavLink>
  );
  let signUpButton = (
    <NavLink to="/signup">
      <li className="nav-item">
        <a className="nav-link">Register</a>
      </li>
    </NavLink>
  );
  return (
    <>
      {loginButton}
      {signUpButton}
    </>
  );
};

export default LoggedOutLinks;
