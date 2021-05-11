import React, { Component } from "react";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import { fetchLiveTruckDataList } from "../../../redux/actions/fetchLiveTruckDataList";
import { fetchLastAuctionListDocument } from "../../../redux/actions/fetchLastAuctionListDocument";
import { fetchPahunchs } from "../../../redux/actions/fetchPahunchs";
import { separateOpenCloseLists } from "../../../redux/actions/separateOpenCloseLists";
import { connect } from "react-redux";
import store from "../../../redux/store";
import styles from "../../../styles/InitializeAuction.module.css";

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
      liveTruckDataList: null,
      lastAucListDoc: null,
      separatedLastOpenClosed: false,
      
      showLALModal: false,
      showLTDModal: false,
      trucksReadyForAuction: 0,
      lalForModalDialog: null,
    };

    this.props.fetchLiveTruckDataList();
    this.props.fetchPahunchs();
    this.props.fetchLastAuctionListDocument();
    // this.props.separateOpenCloseLists();
    store.subscribe(() => {
      let fetchedLiveTruckDataList =
        store.getState().firestore.fetchedLiveTruckDataList;
      let fetchedLastAucListDoc =
        store.getState().firestore.fetchedLastAucListDoc;
      let fetchedPahunchs = store.getState().firestore.fetchedPahunchs;
      let separatedLastOpenClosed =
        store.getState().firestore.separatedLastOpenClosed;
      let lastAucListDoc = store.getState().firestore.lastAucListDoc;
      let liveTruckDataList = store.getState().firestore.liveTruckDataList;
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
        console.log(" before for each value: ", this.state.lastAucListDoc);
        for (let i = 1; i < this.state.lastAucListDoc.size - 1; i++) {
          let truckNo = this.state.lastAucListDoc.get(`${i}`).truck_no;
          let closed =
            this.state.lastAucListDoc.get(`${i}`).bid_closed === "true"
              ? "Yes"
              : "No";
          lal.push({ TruckNo: truckNo, Closed: closed });
        }
        this.setState({ lalForModalDialog: lal });
      }
      this.setState({
        fetchedLiveTruckDataList: fetchedLiveTruckDataList,
        fetchedLastAucListDoc: fetchedLastAucListDoc,
        fetchedPahunchs: fetchedPahunchs,
        separatedLastOpenClosed: separatedLastOpenClosed,
        lastAucListDoc: lastAucListDoc,
        liveTruckDataList: liveTruckDataList,
      });

      // console.log("fetchedLiveTruckDataList: ", fetchedLiveTruckDataList);
      // console.log("fetchedLastAucListDoc: ", fetchedLastAucListDoc);
      // console.log("fetchedPahunchs: ", fetchedPahunchs);
      console.log("separatedLastOpenClosed: ", separatedLastOpenClosed);
      // console.log("lastAucListDoc: ", lastAucListDoc);
      // console.log("liveTruckDataList: ", liveTruckDataList);
      // let lastAuctionData = store.getState().firestore.lastAuctionListDocument;
      // let loadingLastAucData = store.getState().firestore
      //   .fetchedLastAucListDoc;
      // if (!this.state.fetchedLastAucDoc && !loadingLastAucData) {
      //   console.log("last auction list: ", lastAuctionData);
      //   this.setState({ fetchedLastAucDoc: true }, () => {
      //     this.props.separateOpenCloseLists();
      //   });
      // this.props.separateOpenCloseLists(
      //   store.getState().firestore.lastAuctionListDocument
      // );
      // console.log(
      //   "live truck data list: ",
      //   store.getState().firestore.liveTruckDataList
      // );
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

  toggleHideLTDModal = () => {
    this.setState({ showLTDModal: false });
  };

  toggleShowLTDModal = () => {
    this.setState({ showLTDModal: true });
  };

  toggleHideLALModal = () => {
    this.setState({ showLALModal: false });
  };

  toggleShowLALModal = () => {
    this.setState({ showLALModal: true });
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

  handleOnClick = (e) => {
    this.props.separateOpenCloseLists();
  };

  showLiveTruckDataList() {
    if (this.state.fetchedLiveTruckDataList) {
      let trucks = [];
      this.state.liveTruckDataList.forEach((value) => {
        trucks.push(value.TruckNo);
      });
      return (
        <ul>
          {trucks.map((truck) => (
            <li key={truck}>{truck}</li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  showLastAucList() {
    if (this.state.fetchedLastAucListDoc) {
      return (
        <ul>
          {this.state.lalForModalDialog.map((lalItem) => (
            <li key={lalItem.TruckNo}>
              Truck no: {lalItem.TruckNo}, Last closed: {lalItem.Closed}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

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
                <Modal.Title>Live truck data detail</Modal.Title>
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
            <div className="row">
              <div className="col-sm-6">{this.lastAuctionInfoCard()}</div>
              <div className="col-sm-6">{this.liveTruckDataInfoCard()}</div>
            </div>
            <Button
              variant="primary"
              style={{ marginTop: "20px" }}
              onClick={this.handleOnClick}
            >
              Generate new live auction list
            </Button>
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
    separateOpenCloseLists: () => dispatch(separateOpenCloseLists()),
  };
};

export default connect(null, mapDispatchToProps)(InitializeAuction);
