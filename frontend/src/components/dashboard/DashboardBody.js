import React, { Component } from "react";
import styles from "../../styles/DashboardBody.module.css";
import ScheduleAuctionCard from "./ScheduleAuction/ScheduleAuctionCard";
import InitializeAuctionCard from "./InitializeAuction/InitializeAuctionCard";
import ConductAuctionCard from "./ConductAuction/ConductAuctionCard";
import CloseAuctionCard from "./CloseAuction/CloseAuctionCard";

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
          <CloseAuctionCard />
        </div>
      </div>
    );
  }
}

export default DashboardBody;
