import React from "react";
import { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <p className="dashboard-status-text">No Auction In Progress</p>
            <div className="dashboard-status"></div>
            <div className="dashboard-timer">
              <h1 className="text-center">00:00:00</h1>
            </div>
            <hr className="my-4"></hr>
            <p className="lead">
              Steps to conduct an auction: 1) Schedule auction, 2) Initialize
              Auction, 3) Monitor Auction 4) Add Bonus Time(optional step) and
              4) Close Auction.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
