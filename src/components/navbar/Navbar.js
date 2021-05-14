import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../../redux/actions/logout";
import styles from "../../styles/Navbar.module.css";
import { fetchTruckRequests } from "../../redux/actions/fetchTruckRequests";

// import LoggedInLinks from "./LoggedInLinks";
// import LoggedOutLinks from "./LoggedOutLinks";

// import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logout = (e) => {
    console.log("logging out!");
    props.logout();
    handleNavCollapse();
  };
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-md navbar-custom">
        <NavLink to="/">
          <span
            className="navbar-brand"
            onClick={(e) => setIsNavCollapsed(true)}
          >
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
            {props.isLoggedIn ? (
              <>
                <NavLink to="/dashboard">
                  <li className="nav-item" onClick={handleNavCollapse}>
                    <span className="nav-link">Dashboard</span>
                  </li>
                </NavLink>
                <NavLink to="/">
                  <li className="nav-item" onClick={logout}>
                    <span className="nav-link">Logout</span>
                  </li>
                </NavLink>
                <NavDropdown title="Manage Trucks" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <NavLink
                      to="/addTrucksRequests"
                      onClick={handleNavCollapse}
                    >
                      <li className={styles.drop_down_nav_item}>
                        Add truck requests&nbsp;
                        {props.isLoggedIn ? (
                          props.fetchingTruckRequests ? null : props.fetchedTruckRequests.get(
                              "AddRequests"
                            ).length !== 0 ? (
                            <React.Fragment>
                              <span class="badge badge-success">
                                {
                                  props.fetchedTruckRequests.get("AddRequests")
                                    .length
                                }
                              </span>
                            </React.Fragment>
                          ) : null
                        ) : null}
                      </li>
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      to="/removeTrucksRequests"
                      onClick={handleNavCollapse}
                    >
                      <li className={styles.drop_down_nav_item}>
                        Remove truck requests&nbsp;
                        {props.isLoggedIn ? (
                          props.fetchingTruckRequests ? null : props.fetchedTruckRequests.get(
                              "RemoveRequests"
                            ).length !== 0 ? (
                            <React.Fragment>
                              <span class="badge badge-danger">
                                {
                                  props.fetchedTruckRequests.get("RemoveRequests")
                                    .length
                                }
                              </span>
                            </React.Fragment>
                          ) : null
                        ) : null}
                      </li>
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink
                      to="/removeTrucksRequests"
                      onClick={handleNavCollapse}
                    >
                      <li className={styles.drop_down_nav_item}>
                        Show all trucks
                      </li>
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <li
                    className={styles.drop_down_nav_item}
                    onClick={handleNavCollapse}
                  >
                    <span className="nav-link">Login</span>
                  </li>
                </NavLink>
                <NavLink to="/register">
                  <li className="nav-item" onClick={handleNavCollapse}>
                    <span className="nav-link">Register</span>
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

function mapStateToProps(state) {
  //for testing only
  return {
    isLoggedIn: true,
    fetchingTruckRequests: state.firestore.fetchingTruckRequests,
    fetchedTruckRequests: state.firestore.fetchedTruckRequests,
  };

  // return { isLoggedIn: state.auth.isLoggedIn };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
// export default Navbar;
