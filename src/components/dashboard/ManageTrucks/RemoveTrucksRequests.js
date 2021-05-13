import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

function RemoveTrucksRequests() {
  return <>
  <div>remove trucks</div>
  </>;
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: true,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTrucksRequests);
