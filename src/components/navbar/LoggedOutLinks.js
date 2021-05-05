import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOutLinks = () => {
  let loginButton = (
    <NavLink to="/login">
      <li className="nav-item">
        <span className="nav-link">Login</span>
      </li>
    </NavLink>
  );
  let signUpButton = (
    <NavLink to="/signup">
      <li className="nav-item">
        <span className="nav-link">Register</span>
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
