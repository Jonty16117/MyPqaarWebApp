import React, { Component } from "react";
import ic_initializeAuciton from "../../../assets/ic_initializeAuction.jpg";
import styles from "../../../styles/InitializeAuction.module.css";
import { NavLink } from "react-router-dom";

export class InitializeAuctionCard extends Component {
  render() {
    return (
      <>
        <NavLink to="/initializeAuction">
          <div className="card mb-3" className={styles.card}>
            <div className="text-center">
              <img
                className="card-img-top"
                className={styles.card_image}
                src={ic_initializeAuciton}
                alt="Card image cap"
              ></img>
            </div>

            <div className="card-body">
              <h5 className="card-title">Initialize Auction</h5>
              <p className="card-text">
                Initialize auction after scheduling a new auction. In this
                process, a new pqaar list is built and uploaded to live auction
                list. Bid time alloted to each bidder is also decided in this step.
              </p>
            </div>
          </div>
        </NavLink>
      </>
    );
  }
}

export default InitializeAuctionCard;
