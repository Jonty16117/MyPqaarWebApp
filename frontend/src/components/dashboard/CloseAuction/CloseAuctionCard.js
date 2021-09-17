import React, { Component } from "react";
import ic_closeAuction from "../../../assets/ic_closeAuction.jpg";
import styles from "../../../styles/CloseAuctionCard.module.css";
import { NavLink } from "react-router-dom";

export class CloseAuctionCard extends Component {
  render() {
    return (
      <>
        <NavLink to="/closeAuction">
          <div className="card mb-3" className={styles.card}>
            <div className="text-center">
              <img
                className="card-img-top"
                className={styles.card_image}
                src={ic_closeAuction}
                alt="Card image cap"
              ></img>
            </div>

            <div className="card-body">
              <h5 className="card-title">Close Auction</h5>
              <p className="card-text">
                Close the auction here and download the routes, trucks and auction
                reports after closing the auction.
              </p>
            </div>
          </div>
        </NavLink>
      </>
    );
  }
}

export default CloseAuctionCard;
