import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
// import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-md navbar-custom">
        <NavLink to="/">
          <span className="navbar-brand">
            <img src="/logo_pqaar.png" width="30" height="30" alt=""></img>
            &nbsp;&nbsp;Pqaar
          </span>
        </NavLink>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <ul className="navbar-nav ml-auto">
            {props.isLoggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
          </ul>
        </div>
      </nav>
    </>
  );
};

function mapStateToProps(state) {
  return { isLoggedIn: state.auth.isLoggedIn };
} 

export default connect(mapStateToProps)(Navbar);
// export default Navbar;
