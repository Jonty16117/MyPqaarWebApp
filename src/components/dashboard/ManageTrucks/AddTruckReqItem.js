import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "../../../styles/AddTruckReqItem.module.css";
import Viewer from "react-viewer";
import addTruck from "../../../redux/actions/addTruck";
import rejectTruckReq from "../../../redux/actions/rejectTruckReq";

function AddTruckReqItem(props) {
  const [visible, setVisible] = useState(false);
  const [showModal, setModalShow] = useState(false);
  const [onClickButtonInfo, setOnClickButtonInfo] = useState("Accept");

  const handleCloseModal = () => setModalShow(false);
  const handleShowModal = () => setModalShow(true);

  const handleImageClick = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const handleOnClickAccept = (e) => {
    e.preventDefault();
    setOnClickButtonInfo("Accept");
    handleShowModal();
  };

  const handleOnClickReject = (e) => {
    e.preventDefault();
    setOnClickButtonInfo("Reject");
    handleShowModal();
  };

  const handleOnClickModalConfirm = (e) => {
    e.preventDefault();
    if (onClickButtonInfo === "Accept") {
      //dispatch confirm action
      props.addTruck(
        props.OwnerUId,
        props.TruckNo,
        props.FirstName,
        props.LastName,
        props.FrontRCURL,
        props.BackRCURL,
        props.TruckRC
      );
    } else if (onClickButtonInfo === "Reject") {
      //dispatch reject action
      props.rejectTruckReq(props.TruckNo);
    }
    handleCloseModal();
  };

  return (
    <React.Fragment>
      <div
        className="container"
        className={styles.liveAuctionListItem}
        // key={prop.Timestamp}
      >
        <p>Truck No:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.TruckNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Truck RC:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.TruckRC}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Truck Owner:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.FirstName}&nbsp;{props.LastName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Front RC:&nbsp;</p>
        <a href="#" onClick={handleImageClick}>
          <img
            className={styles.ic_lock}
            src={props.FrontRCURL}
            alt="Front RC"
          ></img>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p>Back RC:&nbsp;</p>
        <a href="#" onClick={handleImageClick}>
          <img
            className={styles.ic_lock}
            src={props.BackRCURL}
            alt="Back RC"
          ></img>
        </a>
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={[
            { src: props.FrontRCURL, alt: "Front RC" },
            { src: props.BackRCURL, alt: "Back RC" },
          ]}
          className={styles.ic_lock}
        />
        <br />
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={handleOnClickAccept}
        >
          Accept
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={handleOnClickReject}
        >
          Reject
        </button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm {onClickButtonInfo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {onClickButtonInfo} truck request for Truck No. {props.TruckNo} ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Back
            </Button>
            <Button variant="primary" onClick={handleOnClickModalConfirm}>
              {props.addingTruck ? (
                <React.Fragment>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </React.Fragment>
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    addingTruck: state.firestore.addingTruck,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTruck: (
      ownerUId,
      truckNo,
      ownerFirstName,
      ownerLastName,
      frontRCURL,
      backRCURL,
      truckRC
    ) =>
      dispatch(
        addTruck(
          ownerUId,
          truckNo,
          ownerFirstName,
          ownerLastName,
          frontRCURL,
          backRCURL,
          truckRC
        )
      ),
    rejectTruckReq: (truckNo) => dispatch(rejectTruckReq(truckNo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTruckReqItem);
