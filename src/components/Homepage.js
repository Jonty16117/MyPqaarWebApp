import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";

const Homepage = (props) => {
  return (
    <React.Fragment>
      <div>
        <Navbar loggedIn={props.loggedIn} />
      </div>
      <div>
        <Body />
      </div>
    </React.Fragment>
  );
};

export default Homepage;
