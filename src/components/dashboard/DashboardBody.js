import React, { Component } from "react";
import styles from "../../styles/DashboardBody.module.css";
import ScheduleAuctionCard from "./ScheduleAuction/ScheduleAuctionCard";
import InitializeAuctionCard from "./InitializeAuction/InitializeAuctionCard";
import ConductAuctionCard from "./ConductAuction/ConductAuctionCard";

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
          <ConductAuctionCard />
        </div>
      </div>
    );
  }
}

export default DashboardBody;
