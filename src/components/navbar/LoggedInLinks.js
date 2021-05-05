import React from "react";
import { NavLink } from "react-router-dom";

const LoggedInLinks = () => {
  let dashboardButton = (
    <NavLink to="/dashboard">
      <li className="nav-item">
        <a className="nav-link">Dashboard</a>
      </li>
    </NavLink>
  );
  let logoutButton = (
    <NavLink to="/">
      <li className="nav-item">
        <a className="nav-link">Logout</a>
      </li>
    </NavLink>
  );
  return (
    <>
      {dashboardButton}
      {logoutButton}
    </>
  );
};

export default LoggedInLinks;
