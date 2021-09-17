import React, { Component } from "react";
import ic_conductAuciton from "../../../assets/ic_conductAuction.jpg";
import styles from "../../../styles/ConductAuctionCard.module.css";
import { NavLink } from "react-router-dom";

export class ConductAuctionCard extends Component {
  render() {
    return (
      <>
        <NavLink to="/conductAuction">
          <div className="card mb-3" className={styles.card}>
            <div className="text-center">
              <img
                className="card-img-top"
                className={styles.card_image}
                src={ic_conductAuciton}
                alt="Card image cap"
              ></img>
            </div>

            <div className="card-body">
              <h5 className="card-title">Conduct Auction</h5>
              <p className="card-text">
                Conduct the auction here. Accept bids, reject bids and update live routes list
                automatically. Closing this section during live auction halts the live auction.
              </p>
            </div>
          </div>
        </NavLink>
      </>
    );
  }
}

export default ConductAuctionCard;
