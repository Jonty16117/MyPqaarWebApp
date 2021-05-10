import React, { Component } from "react";
import ic_schedule from "../../../assets/ic_schedule.jpg";
import styles from "../../../styles/ScheduleAuction.module.css";
import { NavLink } from "react-router-dom";

export class ScheduleAuctionCard extends Component {
  render() {
    return (
      <>
        <NavLink to="/addroutes">
          <div className="card mb-3" className={styles.card}>
            <div className="text-center">
              <img
                className="card-img-top"
                className={styles.card_image}
                src={ic_schedule}
                alt="Card image cap"
              ></img>
            </div>

            <div className="card-body">
              <h5 className="card-title">Schedule New Auction</h5>
              <p className="card-text">
                Start a new auction here by adding live routes list and then
                setting the time for the auction.
              </p>
            </div>
          </div>
        </NavLink>
      </>
    );
  }
}

export default ScheduleAuctionCard;
