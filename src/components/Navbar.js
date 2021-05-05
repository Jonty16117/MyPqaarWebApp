import React from "react";

const Navbar = (props) => {
  let loginButton;
  let dashboardButton;
  let logoutButton;
  let signupButton;
  if (props.loggedIn) {
    loginButton = null;
    dashboardButton = (
      <li className="nav-item">
        <a className="nav-link" href="/dashboard">
          Dashboard
        </a>
      </li>
    );
    logoutButton = (
      <li className="nav-item">
        <a className="nav-link" href="/index">
          Logout
        </a>
      </li>
    );
    signupButton = null;
  } else {
    loginButton = (
      <li className="nav-item">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
    );
    dashboardButton = null;
    logoutButton = null;
    signupButton = (
      <li className="nav-item">
        <a className="nav-link" href="/signup">
          Signup
        </a>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-custom">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a class="navbar-brand" href="#">
            <img src="/logo_pqaar.png" width="30" height="30" alt=""></img>
          </a>
        </li>
        <li className="nav-item">
          <a class="navbar-brand" href="#">
            Pqaar
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        {dashboardButton}
        {loginButton}
        {logoutButton}
        {signupButton}
      </ul>
    </nav>
  );
};

export default Navbar;
