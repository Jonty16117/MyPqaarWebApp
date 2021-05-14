import React, { Component } from "react";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import { fetchLiveTruckDataList } from "../../../redux/actions/fetchLiveTruckDataList";
import { fetchLastAuctionListDocument } from "../../../redux/actions/fetchLastAuctionListDocument";
import { fetchPahunchs } from "../../../redux/actions/fetchPahunchs";
import { fetchAuctionsInfo } from "../../../redux/actions/fetchAuctionsInfo";
import { draftLiveAuctionList } from "../../../redux/actions/draftLiveAuctionList";
import { uploadLiveAuctionList } from "../../../redux/actions/uploadLiveAuctionList";
import { connect } from "react-redux";
import store from "../../../redux/store";
import styles from "../../../styles/InitializeAuction.module.css";
import { NavLink } from "react-router-dom";

//utility functions
function objIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class InitializeAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedLiveTruckDataList: false,
      fetchedLastAucListDoc: false,
      fetchedPahunchs: false,
      lastAucListDoc: null,
      liveTruckDataList: null,
      draftedLiveAuctionList: false,
      draftLiveAuctionList: null,

      showLALModal: false,
      showLTDModal: false,
      showNALModal: false,
      trucksReadyForAuction: 0,
      lalForModalDialog: null,
      perUserBidDurationInMillis: 0,
      showErrorAlertFlag: "",
      uploadingLAL: false,
      uploadedLAL: false,
      uploadingLALError: "",
      uploadingLALErrorAlert: false,
    };

    this.props.fetchAuctionsInfo();
    this.props.fetchLiveTruckDataList();
    this.props.fetchPahunchs();
    this.props.fetchLastAuctionListDocument();
    store.subscribe(() => {
      let fetchedLiveTruckDataList =
        store.getState().firestore.fetchedLiveTruckDataList;
      let fetchedPahunchs = store.getState().firestore.fetchedPahunchs;
      let draftedLiveAuctionList =
        store.getState().firestore.draftedLiveAuctionList;
      let lastAucListDoc = store.getState().firestore.lastAucListDoc;
      let fetchedLastAucListDoc =
        store.getState().firestore.fetchedLastAucListDoc;
      let liveTruckDataList = store.getState().firestore.liveTruckDataList;
      let uploadingLAL = store.getState().firestore.uploadingLAL;
      let uploadedLAL = store.getState().firestore.uploadedLAL;
      let uploadingLALError = store.getState().firestore.uploadingLALError;

      if (liveTruckDataList !== undefined && liveTruckDataList.size !== 0) {
        let count = 0;
        liveTruckDataList.forEach((value) => {
          if (value.Active === "true" && value.Status !== "DelInProg") {
            count += 1;
          }
        });
        this.setState({ trucksReadyForAuction: count });
      }
      if (fetchedLastAucListDoc) {
        let lal = [];
        for (let i = 1; i < this.state.lastAucListDoc.size; i++) {
          let truckNo = this.state.lastAucListDoc.get(`${i}`).truck_no;
          let closed =
            this.state.lastAucListDoc.get(`${i}`).bid_closed === "true"
              ? "Yes"
              : "No";
          lal.push({ TruckNo: truckNo, Closed: closed, CurrListNo: i });
        }
        this.setState({ lalForModalDialog: lal });
      }
      if (draftedLiveAuctionList) {
        this.setState(
          {
            draftLiveAuctionList:
              store.getState().firestore.draftLiveAuctionList,
          },
          () => {
            this.setState({ draftedLiveAuctionList: true });
            // console.log(this.state.draftLiveAuctionList)
          }
        );
      }
      this.setState({
        fetchedLiveTruckDataList: fetchedLiveTruckDataList,
        fetchedLastAucListDoc: fetchedLastAucListDoc,
        fetchedPahunchs: fetchedPahunchs,
        lastAucListDoc: lastAucListDoc,
        liveTruckDataList: liveTruckDataList,
        uploadingLAL: uploadingLAL,
        uploadedLAL: uploadedLAL,
        uploadingLALError: uploadingLALError,
      });
    });
  }

  showSpinner = () => {
    return (
      <Spinner animation="border" role="status" style={{ margin: "25px auto" }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

  cardHeader = () => {
    return (
      <Card.Header style={{ fontWeight: "bold" }}>
        Initialize new auction list
      </Card.Header>
    );
  };

  cardFooter = () => {
    return (
      <Card.Footer className="text-muted">
        <p style={{ fontSize: "10px", margin: "0" }}></p>
      </Card.Footer>
    );
  };

  //Live Truck Data
  toggleHideLTDModal = () => {
    this.setState({ showLTDModal: false });
  };

  toggleShowLTDModal = () => {
    this.setState({ showLTDModal: true });
  };

  //Last Auction List
  toggleHideLALModal = () => {
    this.setState({ showLALModal: false });
  };

  toggleShowLALModal = () => {
    this.setState({ showLALModal: true });
  };

  //New Auction List
  toggleHideNALModal = () => {
    this.setState({ showNALModal: false });
  };

  toggleShowNALModal = () => {
    this.setState({ showNALModal: true });
  };

  lastAuctionInfoCard = () => {
    return (
      <a href="#">
        <div
          className="card mb-3"
          className={styles.card}
          onClick={this.toggleShowLALModal}
        >
          <div className="card-body">
            <h5 className="card-title">Last auction overview</h5>
            {this.state.fetchedLastAucListDoc ? (
              <p className="card-text">
                Last auction had total {this.state.lastAucListDoc.size - 1}{" "}
                trucks out of which{" "}
                {this.state.lalForModalDialog.reduce(
                  (t, value) => t + (value.closed === "true" ? 1 : 0),
                  0
                )}{" "}
                trucks closed their bids.
              </p>
            ) : (
              this.showSpinner()
            )}
          </div>
        </div>
      </a>
    );
  };

  liveTruckDataInfoCard = () => {
    return (
      <a href="#">
        <div
          className="card mb-3"
          className={styles.card}
          onClick={this.toggleShowLTDModal}
        >
          <div className="card-body">
            <h5 className="card-title">Current trucks info</h5>
            {this.state.fetchedLiveTruckDataList &&
            this.state.fetchedPahunchs ? (
              <p className="card-text">
                There are total {this.state.liveTruckDataList.size} trucks
                registered out of which {this.state.trucksReadyForAuction}{" "}
                trucks are ready for the next auction.
              </p>
            ) : (
              this.showSpinner()
            )}
          </div>
        </div>
      </a>
    );
  };

  uploadedNALAlert() {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          margin: "20px 10px 5px",
        }}
      >
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          New live auction list is successfully uploaded, click&nbsp;
          <NavLink to="/dashboard">
            <span className={styles.dashboardLink}>here</span>
          </NavLink>
          &nbsp;to go the dashboard.
        </p>
      </div>
    );
  }

  uploadingLALError() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          margin: "0 auto 0 auto",
        }}
      >
        Failed to upload live auction list, please try again!
      </div>
    );
  }

  handleOnClick = (e) => {
    // let perUserBidDurationInMillis = 15000;
    if (this.state.perUserBidDurationInMillis <= 0) {
      this.setState({ showErrorAlertFlag: "Invalid bid time per user!" });
    } else if (
      !this.state.fetchedLiveTruckDataList ||
      !this.state.fetchedLastAucListDoc ||
      !this.state.fetchedPahunchs
    ) {
      this.setState({
        showErrorAlertFlag: "Please wait while the data is loaded!",
      });
    } else {
      this.setState({
        showErrorAlertFlag: "",
      });
      this.toggleShowNALModal();
      this.props.draftLiveAuctionList(this.state.perUserBidDurationInMillis);
    }
  };

  showLiveTruckDataList() {
    if (this.state.fetchedLiveTruckDataList) {
      let trucks = [];
      this.state.liveTruckDataList.forEach((value) => {
        if (value.Active === "true") {
          trucks.push(value.TruckNo);
        }
      });
      return (
        <React.Fragment>
          <ul>
            <div className="row">
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Sr no.
              </div>
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Truck No.
              </div>
            </div>
            {trucks.map((truck, index) => (
              <div className="row" key={truck}>
                <div className="col" style={{ textAlign: "center" }}>
                  {index + 1}
                </div>
                <div className="col" style={{ textAlign: "center" }}>
                  {truck}
                </div>
              </div>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  showLastAucList() {
    if (this.state.fetchedLastAucListDoc) {
      return (
        <React.Fragment>
          <ul>
            <div className="row">
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Sr no.
              </div>
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Truck No.
              </div>
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Last Closed
              </div>
            </div>
            {this.state.lalForModalDialog.map((lalItem) => (
              <div className="row" key={lalItem.CurrListNo}>
                <div className="col" style={{ textAlign: "center" }}>
                  {lalItem.CurrListNo}
                </div>
                <div className="col" style={{ textAlign: "center" }}>
                  {lalItem.TruckNo}
                </div>
                <div className="col" style={{ textAlign: "center" }}>
                  {lalItem.Closed}
                </div>
              </div>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  showDraftLiveAuctionList() {
    if (this.state.draftedLiveAuctionList) {
      return (
        <React.Fragment>
          <ul>
            <div className="row">
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Pqaar no.
              </div>
              <div
                className="col"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Truck No.
              </div>
            </div>
            {this.state.draftLiveAuctionList.map((listItem) => (
              <div className="row" key={listItem.CurrNo}>
                <div className="col" style={{ textAlign: "center" }}>
                  {listItem.CurrNo}
                </div>
                <div className="col" style={{ textAlign: "center" }}>
                  {listItem.TruckNo}
                </div>
              </div>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  handleChangeBidTime = (e) => {
    this.setState({ perUserBidDurationInMillis: Number(e.target.value) });
  };

  showErrorAlert(error) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          margin: "0 auto 0 auto",
        }}
      >
        {error}
      </div>
    );
  }

  handleClickUploadLAL = (e) => {
    if (this.state.uploadingLALError.length !== 0) {
      this.setState({ uploadingLALErrorAlert: true });
    } else {
      this.setState({ uploadingLALErrorAlert: false });
      this.props.uploadLiveAuctionList();
      //update new auction timings
    }
  };

  render() {
    return (
      <div className="container-flud">
        <Card className="text-center">
          {this.cardHeader()}
          <Card.Body>
            <Modal
              show={this.state.showLTDModal}
              onHide={this.toggleHideLTDModal}
              backdrop="static"
              keyboard={true}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Live registered trucks</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  {this.showLiveTruckDataList()}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.toggleHideLTDModal}>
                  Back
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.showLALModal}
              onHide={this.toggleHideLALModal}
              backdrop="static"
              keyboard={true}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Last auction overview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  {this.showLastAucList()}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.toggleHideLALModal}>
                  Back
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.showNALModal}
              onHide={this.toggleHideNALModal}
              backdrop="static"
              keyboard={true}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {this.state.draftedLiveAuctionList
                    ? "Generated"
                    : "Generating"}{" "}
                  new live auction list
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!this.state.draftedLiveAuctionList ? (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <React.Fragment>
                    {this.showDraftLiveAuctionList()}
                  </React.Fragment>
                )}
                {this.state.uploadedLAL ? this.uploadedNALAlert() : null}
                {this.state.uploadedLAL &&
                this.state.uploadingLALError.length !== 0
                  ? this.uploadingLALErrorAlert()
                  : null}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.toggleHideNALModal}>
                  Back
                </Button>
                {this.state.uploadingLAL ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button variant="primary" onClick={this.handleClickUploadLAL}>
                    Upload new auction list
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
            <div className="row">
              <div className="col-sm-6">{this.lastAuctionInfoCard()}</div>
              <div className="col-sm-6">{this.liveTruckDataInfoCard()}</div>
            </div>

            <div className="row">
              <input
                className="form-control form-control-sm"
                type="number"
                placeholder="Enter bid time per user"
                style={{ marginBottom: "25px" }}
                onChange={this.handleChangeBidTime}
              ></input>
              <Button
                variant="primary"
                style={{
                  marginTop: "0px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "25px",
                }}
                onClick={this.handleOnClick}
              >
                Generate new live auction list
              </Button>
              <div className="row"></div>
            </div>
            {this.state.showErrorAlertFlag.length !== 0
              ? this.showErrorAlert(this.state.showErrorAlertFlag)
              : null}
          </Card.Body>
          {this.cardFooter()}
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLiveTruckDataList: () => dispatch(fetchLiveTruckDataList()),
    fetchLastAuctionListDocument: () =>
      dispatch(fetchLastAuctionListDocument()),
    fetchPahunchs: () => dispatch(fetchPahunchs()),
    draftLiveAuctionList: (perUserBidDurationInMillis) =>
      dispatch(draftLiveAuctionList(perUserBidDurationInMillis)),
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    uploadLiveAuctionList: () => dispatch(uploadLiveAuctionList()),
  };
};

export default connect(null, mapDispatchToProps)(InitializeAuction);
