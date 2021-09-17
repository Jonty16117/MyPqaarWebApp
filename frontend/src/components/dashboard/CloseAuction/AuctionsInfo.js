import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Timer from "react-compound-timer";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import { fetchAuctionsInfo } from "../../../redux/actions/fetchAuctionsInfo";

const NO_AUCTIONS = "No auction in-progress or scheduled";
const AUCTION_IS_SCHEDULED = "Next scheduled auction in";
const AUCTION_IS_LIVE = "Auction is live and ending in";

function AuctionsInfo(props) {
  const auctionsInfo = () => {
    let currTime = Date.now();
    if (
      currTime >= Number(props.aucTimings.StartTime) &&
      currTime < Number(props.aucTimings.EndTime)
    ) {
      return (
        <React.Fragment>
          <p>Auction is live</p>
          <Timer
            initialTime={props.aucTimings.EndTime - Date.now()}
            direction="backward"
          >
            {() => (
              <React.Fragment>
                <h1 className="text-center" style={{margin: "0"}}>
                  <Timer.Days />:<Timer.Hours />
                  :<Timer.Minutes />:<Timer.Seconds />
                </h1>
              </React.Fragment>
            )}
          </Timer>
        </React.Fragment>
      );
    } else if (currTime < Number(props.aucTimings.StartTime)) {
      return (
        <React.Fragment>
          <p>Next Auction In</p>
          <Timer
            initialTime={props.aucTimings.StartTime - Date.now()}
            direction="backward"
          >
            {() => (
              <React.Fragment>
                <h1 className="text-center" style={{margin: "0"}}>
                  <Timer.Days />:<Timer.Hours />
                  :<Timer.Minutes />:<Timer.Seconds />
                </h1>
              </React.Fragment>
            )}
          </Timer>
        </React.Fragment>
      );
    } else {
      return <h1 className="text-center">No Live Auctions In-Progress</h1>;
    }
  };

  const spinner = () => (
    <Spinner animation="border" role="status" style={{ margin: "100px auto" }}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  return (
    <div style={{textAlign: "center", margin: "20px 0 0 0"}}>
      {props.aucTimingIsLoading ? spinner() : auctionsInfo()}
    </div>)
}

const mapStateToProps = (state) => {
  return {
    aucTimingIsLoading: state.firestore.aucTimingIsLoading,
    aucTimings: state.firestore.aucTimings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsInfo);
