import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import Timer from "react-compound-timer";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import AuctionsInfo from "./AuctionsInfo";
import { fetchAuctionsInfo } from "../../../redux/actions/fetchAuctionsInfo";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/ConductAuction.module.css";
import lifecycle from "react-pure-lifecycle";
import closeAuction from "../../../redux/actions/closeAuction";
import { fetchLastAuctionListDocument } from "../../../redux/actions/fetchLastAuctionListDocument";
import { CSVLink } from "react-csv";

function CloseAuction(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const auctionClosedSuccessAlert = () => {
    return (
      <React.Fragment>
        {props.fetchedLastAucListDoc === false ? (
          <div
            style={{
              textAlign: "center",
              margin: "25px",
            }}
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginBottom: "7px" }}
            />
          </div>
        ) : (
          <div
            className="alert alert-success"
            role="alert"
            style={{
              margin: "20px 10px 5px",
            }}
          >
            Auction is closed successfully. Click&nbsp;
            <CSVLink
              data={props.fetchedLastAucListDocInCSV}
              filename={`${props.lastAucListTimestamp}.csv`}
              className={styles.dashboardLink}
            >
              here
            </CSVLink>
            &nbsp;to download auction reports. Click&nbsp;
            <NavLink to="/dashboard" className={styles.dashboardLink}>
                here
            </NavLink>
            &nbsp;to go the dashboard.
          </div>
        )}
      </React.Fragment>
    );
  };

  const handleOnClickCloseAuction = (e) => {
    handleCloseModal();
    props.closeAuction();
    props.fetchLastAuctionListDocument();
  };

  return (
    <div className="container">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close the live auction?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Back
          </Button>
          <Button variant="primary" onClick={handleOnClickCloseAuction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <AuctionsInfo />
      {props.closingAuction === false ? auctionClosedSuccessAlert() : null}
      {props.aucTimings.StartTime !== 0 &&
      props.aucTimings.Endtime !== 0 &&
      (props.aucTimings.StartTime <= Date.now() ||
        (props.bonusTimings.StartTime <= Date.now() &&
          props.bonusTimings.EndTime > Date.now())) ? (
        props.closingAuction === null ? (
          <Button variant="primary" size="lg" block onClick={handleShowModal}>
            Close Auction
          </Button>
        ) : props.closingAuction === true ? (
          <Button variant="primary" size="lg" block disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{ marginBottom: "7px" }}
            />
            <span className="sr-only">Closing auction...</span>
          </Button>
        ) : (
          <Button variant="primary" size="lg" block disabled>
            Auction Closed
          </Button>
        )
      ) : (
        <Button variant="primary" size="lg" block disabled>
          No Live Auction
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  //creating csv file header
  let csvHeader = [
    "Pqaar No.",
    "Truck No.",
    "Closed",
    "Source",
    "Destination",
    "Prev. Pqaar No.",
  ];
  let fetchedLastAucListDocInCSV = [csvHeader];
  let lastAucListTimestamp = "empty";
  if (
    state.firestore.fetchedLastAucListDoc &&
    state.firestore.lastAucListDoc !== null &&
    state.firestore.lastAucListDoc.size !== 0
  ) {
    lastAucListTimestamp = state.firestore.lastAucListDoc.get("Timestamp");
    let totalTrucksInLastAuc = state.firestore.lastAucListDoc.size;
    // exclude one field for timestamp
    totalTrucksInLastAuc--;
    for (let pqaarNo = 1; pqaarNo <= totalTrucksInLastAuc; pqaarNo++) {
      let row = [];
      let isClosed = "No";
      let source = "--";
      let destination = "--";
      let prevNo = "--";
      if (
        state.firestore.lastAucListDoc.get(pqaarNo.toString()).Closed === "true"
      ) {
        isClosed = "Yes";
        source = state.firestore.lastAucListDoc.get(pqaarNo.toString()).Src;
        destination = state.firestore.lastAucListDoc.get(
          pqaarNo.toString()
        ).Des;
      }
      if (
        state.firestore.lastAucListDoc.get(pqaarNo.toString()).PrevNo !== null
      ) {
        prevNo = state.firestore.lastAucListDoc.get(pqaarNo.toString()).PrevNo;
      }
      row.push(state.firestore.lastAucListDoc.get(pqaarNo.toString()).CurrNo);
      row.push(state.firestore.lastAucListDoc.get(pqaarNo.toString()).TruckNo);
      row.push(isClosed);
      row.push(source);
      row.push(destination);
      row.push(prevNo);
      fetchedLastAucListDocInCSV.push(row);
    }
  }

  return {
    aucTimingIsLoading: state.firestore.aucTimingIsLoading,
    aucTimings: state.firestore.aucTimings,
    closingAuction: state.firestore.closingAuction,
    closedAuction: state.firestore.closedAuction,
    bonusTimings: state.firestore.bonusTimings,
    fetchedLastAucListDoc: state.firestore.fetchedLastAucListDoc,
    fetchedLastAucListDocInCSV: fetchedLastAucListDocInCSV,
    lastAucListTimestamp: lastAucListTimestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    closeAuction: () => dispatch(closeAuction()),
    fetchLastAuctionListDocument: () =>
      dispatch(fetchLastAuctionListDocument()),
  };
};

const methods = {
  componentDidMount(props) {
    props.fetchAuctionsInfo();
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(CloseAuction));
// export default CloseAuction;
