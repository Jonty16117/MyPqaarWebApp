import React from "react";
import { NavLink } from "react-router-dom";

const LoggedInLinks = () => {
  let dashboardButton = (
    <NavLink to="/dashboard">
      <li className="nav-item">
        <span className="nav-link">Dashboard</span>
      </li>
    </NavLink>
  );
  let logoutButton = (
    <NavLink to="/">
      <li className="nav-item">
        <span className="nav-link">Logout</span>
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
