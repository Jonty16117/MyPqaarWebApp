import React, { Component } from "react";
import styles from "../../styles/DashboardBody.module.css";
import ScheduleAuction from "./ScheduleAuction/ScheduleAuction";

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
          <ScheduleAuction />
        </div>
      </div>
    );
  }
}

export default DashboardBody;

// function result(a, b, c) {
//     return a * (b + c) - (b * c)
// }

// const d = result(1, 2, 3)
