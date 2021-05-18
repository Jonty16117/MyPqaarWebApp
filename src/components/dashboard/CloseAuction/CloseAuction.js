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

function CloseAuction(props) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const auctionClosedSuccessAlert = () => {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          margin: "20px 10px 5px",
        }}
      >
        Auction is closed successfully. Click&nbsp;
        <a href="#" className={styles.dashboardLink}>
          here
        </a>
        &nbsp;to download auction reports. Click&nbsp;
        <NavLink to="/dashboard">
          <a href="#" className={styles.dashboardLink}>
            here
          </a>
        </NavLink>
        &nbsp;to go the dashboard.
      </div>
    );
  };

  const handleOnClickCloseAuction = (e) => {
    handleCloseModal();
    props.closeAuction();
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
      {/* {true ? (auctionClosedSuccessAlert()) : (null)} */}
      {props.closingAuction === false ? auctionClosedSuccessAlert() : null}
      {(
        props.aucTimings.StartTime !== 0 &&
        props.aucTimings.Endtime !== 0 && 
        props.aucTimings.StartTime <= Date.now()
        ) ? (
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
  return {
    aucTimingIsLoading: state.firestore.aucTimingIsLoading,
    aucTimings: state.firestore.aucTimings,
    closingAuction: state.firestore.closingAuction,
    closedAuction: state.firestore.closedAuction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    closeAuction: () => dispatch(closeAuction()),
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
