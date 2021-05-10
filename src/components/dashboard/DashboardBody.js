import React, { Component } from "react";
import styles from "../../styles/DashboardBody.module.css";
import ScheduleAuctionCard from "./ScheduleAuction/ScheduleAuctionCard";
import InitializeAuctionCard from "./InitializeAuction/InitializeAuctionCard";

class DashboardBody extends Component {
  render() {
    return (
      <div>
        <div
          className="jumbotron jumbotron-fluid"
          className={styles.jumbotron}
          style={{
            marginBottom: "0px",
          }}
        >
          <ScheduleAuctionCard />
          <InitializeAuctionCard />
        </div>
      </div>
    );
  }
}

export default DashboardBody;
