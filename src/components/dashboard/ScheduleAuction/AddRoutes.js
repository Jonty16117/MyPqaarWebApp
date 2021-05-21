import React, { Component, useState } from "react";
import styles from "../../../styles/AddRoutes.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import store from "../../../redux/store";
import { fetchPRL } from "../../../redux/actions/fetchPRL";
import { uploadLiveRoutesList } from "../../../redux/actions/uploadLiveRoutesList";
import { updateAuctionStartTimings } from "../../../redux/actions/updateAuctionStartTimings";
import { connect } from "react-redux";
import ProposedRouteListItem from "./ProposedRouteListItem";
import LiveRoutesListItem from "./LiveRoutesListItem";
import { NavLink } from "react-router-dom";
import { CurrTimeInMillis } from "../../../utils/utilityFunctions";

function isARoute(key) {
  if (key === "Status" || key === "Timestamp" || key === "Mandi") {
    return false;
  }
  return true;
}

class AddRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prlIsLoading: true,
      prl: [],
      lr: [],
      lRLDataErrorAlert: false,
      auctionTime: new Date(),
      showModal: false,
      scheduledFlag: false,
      uploadError: false,
    };
    this.props.fetchPRL();
    store.subscribe(() => {
      this.setState(
        {
          prlIsLoading: store.getState().firestore.prlIsLoading,
          prl: store.getState().firestore.prl,
        },
        () => {
          let newLR = [];
          store.getState().firestore.prl.forEach((item) => {
            let mandi = { Mandi: item.Mandi, Routes: [] };
            for (const property in item) {
              if (isARoute(property)) {
                mandi.Routes.push({
                  Des: property,
                  Req: item[property],
                  Rate: 0,
                });
                mandi.Routes.sort((a, b) =>
                  a.Des > b.Des ? 1 : b.Des > a.Des ? -1 : 0
                );
              }
            }
            newLR.push(mandi);
          });
          this.setState({
            lr: newLR,
            lRLDataErrorAlert: false,
          });
        }
      );
    });
  }

  setauctionTime(date) {
    this.setState({ auctionTime: date });
  }

  toggleHideModal = () => {
    this.setState({ showModal: false });
  };

  toggleShowModal = () => {
    this.setState({ showModal: true });
  };

  LRLDataErrorAlert() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          margin: "-5px 10px 10px",
        }}
      >
        Please fill all the entries correctly!
      </div>
    );
  }

  uploadErrorAlert() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          margin: "20px 10px 5px",
        }}
      >
        Sorry, failed to upload scheduled auction data. Please try again!
      </div>
    );
  }

  scheduledAuctionFlag() {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          margin: "20px 10px 5px",
        }}
      >
        Auction is scheduled at {this.state.auctionTime.toString()}{" "}
        successfully! click&nbsp;
        <NavLink to="/dashboard">
          <a href="#" className={styles.dashboardLink}>
            here
          </a>
        </NavLink>
        &nbsp;to go the dashboard.
      </div>
    );
  }

  validateLRLData() {
    let data = store.getState().firestore.draftLRL;
    let isValid = true;
    if (data.length === 0) {
      isValid = false;
    }
    data.forEach((lrItem) => {
      lrItem.Routes.forEach((route) => {
        if (
          isNaN(route.Req) ||
          isNaN(route.Rate) ||
          !Number.isInteger(route.Req) ||
          !Number.isInteger(route.Rate) ||
          route.Req <= 0 ||
          route.Rate <= 0
        ) {
          isValid = false;
        }
      });
    });
    return isValid;
  }

  handleClickLR = (e) => {
    //for testing
    // this.toggleShowModal();
    //-----------------------------------

    if (this.validateLRLData()) {
      this.toggleShowModal();
      this.setState({ lRLDataErrorAlert: false });
    } else {
      this.toggleHideModal();
      this.setState({ lRLDataErrorAlert: true });
    }
  };

  handleClickSetScheduleAuction = (e) => {
    // for testing
    console.log(this.state.auctionTime.getTime());
    // this.setState({ scheduledFlag: false });
    // ----------------------------------------

    //upload to live routes list and schedule time to firestore
    let finalLRL = store.getState().firestore.draftLRL;
    this.props.uploadLiveRoutesList(finalLRL);

    //updating auction start timing
    let aucitonStartTime = this.state.auctionTime.getTime();
    this.props.updateAuctionStartTimings(aucitonStartTime);

    if (store.getState().firestore.errors.length !== 0) {
      this.setState({ uploadErrorAlert: true });
      this.setState({ scheduledFlag: false });
    } else {
      //update local flags
      this.setState({ uploadError: false });
      this.setState({ scheduledFlag: true });
    }
  };

  render() {
    return (
      <div className="container-flud">
        <div className="row">
          <div className="col-sm-6">
            <Card className="text-center">
              <Card.Header style={{ fontWeight: "bold" }}>
                Proposed Mandi Routes List
              </Card.Header>

              {this.state.prlIsLoading ? (
                <Spinner
                  animation="border"
                  role="status"
                  style={{ margin: "100px auto" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <Card.Body>
                  {this.state.prl.map((prlItem, index) => {
                    return (
                      <ProposedRouteListItem
                        prlItem={prlItem}
                        key={prlItem.Mandi}
                      />
                    );
                  })}
                  {/* <Button variant="primary" style={{ marginTop: "20px" }}>
                    Copy Default To Live Routes List
                  </Button> */}
                </Card.Body>
              )}
              <Card.Footer className="text-muted">
                <p style={{ fontSize: "10px", margin: "0" }}>
                  This is the live proposed routes list from all the mandis and
                  is up to date in real time.
                </p>
              </Card.Footer>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card className="text-center">
              <Card.Header style={{ fontWeight: "bold" }}>
                Live Routes List
              </Card.Header>
              {this.state.prlIsLoading ? (
                <Spinner
                  animation="border"
                  role="status"
                  style={{ margin: "100px auto" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <Card.Body>
                  {this.state.lr.map((lrItem, index) => {
                    return (
                      <LiveRoutesListItem
                        lrItem={lrItem}
                        storeIndex={index}
                        key={lrItem.Mandi}
                      />
                    );
                  })}
                  <Button
                    variant="primary"
                    style={{ marginTop: "20px", marginBottom: "0px" }}
                    onClick={this.handleClickLR}
                  >
                    Proceed
                  </Button>
                  <Modal
                    show={this.state.showModal}
                    onHide={this.toggleHideModal}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Select date and time for the auction
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <DatePicker
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          showTimeInput
                          selected={this.state.auctionTime}
                          minDate={new Date()}
                          onChange={(date) => this.setauctionTime(date)}
                        />
                      </div>
                      {store.getState().firestore.lrlIsUpLoading ? (
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
                      ) : null}
                      {this.state.scheduledFlag === true
                        ? this.scheduledAuctionFlag()
                        : null}
                      {this.state.uploadError === true
                        ? this.uploadErrorAlert()
                        : null}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={this.toggleHideModal}
                      >
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        onClick={this.handleClickSetScheduleAuction}
                      >
                        Schedule Auction
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              )}
              {this.state.lRLDataErrorAlert === true
                ? this.LRLDataErrorAlert()
                : null}
              <Card.Footer className="text-muted">
                <p style={{ fontSize: "10px", margin: "0" }}>
                  This is the list after editing will can be uploaded based on
                  which new auction can be scheduled.
                </p>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPRL: () => dispatch(fetchPRL()),
    uploadLiveRoutesList: (lrl) => dispatch(uploadLiveRoutesList(lrl)),
    updateAuctionStartTimings: (startTimeInMilli) =>
      dispatch(updateAuctionStartTimings(startTimeInMilli)),
  };
};

export default connect(null, mapDispatchToProps)(AddRoutes);
