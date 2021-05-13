import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/logout";

class LoggedInLinks extends Component {
  logout = (e) => {
    console.log("logging out!");
    this.props.logout();
  };
  render() {
    return (
      <>
        <NavLink to="/dashboard">
          <li className="nav-item">
            <span className="nav-link">Dashboard</span>
          </li>
        </NavLink>
        <NavLink to="/">
        <li className="nav-item" onClick={this.logout}>
          <span className="nav-link">Logout</span>
        </li>
        </NavLink>
        <NavLink to="/">
        <li className="nav-item" onClick={this.logout}>
          <span className="nav-link">Logout</span>
        </li>
        </NavLink>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LoggedInLinks);
