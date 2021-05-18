import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchLiveAuctionList } from "../../../redux/actions/fetchLiveAuctionList";
import { fetchAuctionsInfo } from "../../../redux/actions/fetchAuctionsInfo";
import { fetchLiveRoutesList } from "../../../redux/actions/fetchLiveRoutesList";
import { uploadBonusTime } from "../../../redux/actions/uploadBonusTime";
import { Table, Card, Button, Spinner, Modal } from "react-bootstrap";
import styles from "../../../styles/LiveAuctionList.module.css";
import Timer from "react-compound-timer";
import DatePicker from "react-datepicker";
import ic_locked from "../../../assets/ic_locked.png";
import ic_unlocked from "../../../assets/ic_unlocked.png";
import ic_green_check from "../../../assets/ic_green_check.png";

const CHUNKED_LIST_SIZE = 200;
const chunkList = (a, n) =>
  [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

class LiveAuctionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatingLAL: true,
      chunkedLAL: [],
      updatingBonusTime: false,
      showBonusTimeModal: false,
      editBonusStartTime: null,
      editBonusEndTime: null,
    };
    this.props.fetchLiveAuctionList();
    this.props.fetchAuctionsInfo();
    this.props.fetchLiveRoutesList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      updatingLAL: nextProps.updatingLAL,
      chunkedLAL: nextProps.updatedLAL,
      verifyingNewBidReq: nextProps.verifyingNewBidReq,
      updatingBonusTime: nextProps.updatingBonusTime,
    });
  }

  handleOnChangeBonusStartTime = (date) => {
    this.setState({ editBonusStartTime: date });
  };

  handleOnChangeBonusEndTime = (date) => {
    this.setState({ editBonusEndTime: date });
  };

  handleOnClickUploadBonusTime = (e) => {
    e.preventDefault();
    console.log(this.state.editBonusStartTime, this.state.editBonusEndTime)
    let startTime = this.state.editBonusStartTime
    let endTime = this.state.editBonusEndTime
    if (startTime !== null && endTime  !== null) {
      this.props.uploadBonusTime(startTime.getTime(), endTime.getTime())
      this.toggleHideBonusTimeModal();
    }
  };

  toggleLALGroupOnClick = (e, index) => {
    e.preventDefault();
  };

  liveAuctionListGroupItem = (chunkedItem) => {
    return (
      <Accordion
        // defaultActiveKey={this.state[index]}
        defaultActiveKey="1"
        key={chunkedItem[0].CurrNo}
      >
        <div className="container-flud collapsible">
          <Accordion.Toggle as={"div"} eventKey="1">
            <a
              href="#"
              onClick={(e, index) => this.toggleLALGroupOnClick(e, index)}
            >
              <div
                className="shadow-lg p-3 mb-5 bg-green rounded"
                className={styles.prl_container}
              >
                <p>
                  {chunkedItem[0].CurrNo} to{" "}
                  {Number(chunkedItem[0].CurrNo) + chunkedItem.length - 1}
                </p>
              </div>
            </a>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <>
              {/* List inside this group */}
              {chunkedItem.map((aucItem) => (
                <div
                  className="container"
                  className={styles.liveAuctionListItem}
                  key={aucItem.CurrNo}
                >
                  <p>Pqaar no:&nbsp;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {aucItem.CurrNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>Truck no:&nbsp;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {aucItem.TruckNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>Prev. no:&nbsp;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {aucItem.PrevNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  {aucItem.Closed === "true" ? (
                    <React.Fragment>
                      <p>Accepted&nbsp;</p>
                      <img
                        className={styles.ic_lock}
                        src={ic_green_check}
                        alt="bid accepted"
                      ></img>
                    </React.Fragment>
                  ) : aucItem.StartTime <= Date.now() ? (
                    <React.Fragment>
                      <p>Unlocked&nbsp;</p>
                      <img
                        className={styles.ic_lock}
                        src={ic_unlocked}
                        alt="unlocked"
                      ></img>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p>Unlocks in:&nbsp;</p>
                      <p style={{ fontWeight: "bold" }}>
                        <Timer
                          initialTime={aucItem.StartTime - Date.now()}
                          direction="backward"
                        >
                          {() => (
                            <React.Fragment>
                              <Timer.Hours />
                              &nbsp;:&nbsp;
                              <Timer.Minutes />
                              &nbsp;:&nbsp;
                              <Timer.Seconds />
                              &nbsp;
                            </React.Fragment>
                          )}
                        </Timer>
                      </p>
                      <img
                        className={styles.ic_lock}
                        src={ic_locked}
                        alt="locked"
                      ></img>
                    </React.Fragment>
                  )}
                </div>
              ))}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    );
  };

  liveAuctionListGroup = () =>
    this.state.chunkedLAL.map((chunkedItem, index) => {
      return this.liveAuctionListGroupItem(chunkedItem, index);
    });

  handleClickSetBonusTime = (e) => {
    this.toggleShowBonusTimeModal();
  };

  toggleShowBonusTimeModal = () => {
    this.setState({ showBonusTimeModal: true });
  };

  toggleHideBonusTimeModal = () => {
    this.setState({ showBonusTimeModal: false });
  };

  showAddBonusTimeModal = () => {
    return (
      <Modal
        show={this.state.showBonusTimeModal}
        onHide={this.toggleHideBonusTimeModal}
        keyboard={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select bonus time start and end time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <DatePicker
              selected={this.state.editBonusStartTime}
              onChange={this.handleOnChangeBonusStartTime}
              includeDates={[new Date()]}
              placeholderText="Enter bonus start time"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <DatePicker
              selected={this.state.editBonusEndTime}
              onChange={this.handleOnChangeBonusEndTime}
              includeDates={[new Date()]}
              placeholderText="Enter bonus end time"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </div>
          {this.state.updatingBonusTime ? (
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleHideBonusTimeModal}>
            Back
          </Button>
          <Button variant="primary" onClick={this.handleOnClickUploadBonusTime}>
            Release Bonus Time
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card className="text-center">
          <Card.Header style={{ fontWeight: "bold" }}>
            <p style={{ margin: "0" }}>Live Auction List</p>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ margin: "10px 0 0 0" }}
              onClick={this.handleClickSetBonusTime}
            >
              Add Bonus Time
            </Button>
            {this.showAddBonusTimeModal()}
          </Card.Header>
          <Card.Body>
            {/* List of groups */}
            {this.state.updatingLAL ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "0px",
                }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{ margin: "150px auto" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              this.state.chunkedLAL.map((chunkedItem) => {
                return this.liveAuctionListGroupItem(chunkedItem);
              })
            )}
          </Card.Body>
          <Card.Footer className="text-muted">
            <p style={{ fontSize: "15px", margin: "0" }}>
              Click on any auction list range to view/hide live auction list in that
              range.
            </p>
          </Card.Footer>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  let LALMapToArray = [];
  state.firestore.updatedLAL.forEach((value) => {
    LALMapToArray.push(value);
  });
  let chunkedLAL = chunkList(LALMapToArray, CHUNKED_LIST_SIZE);

  return {
    updatingLRL: state.firestore.updatingLRL,
    updatedLRL: state.firestore.updatedLRL,

    verifyingNewBidReq: state.firestore.verifyingNewBidReq,
    // accordToggle: accordToggle,
    updatingLAL: state.firestore.updatingLAL,
    updatedLAL: chunkedLAL,
    updatingLALError: state.firestore.updatingLALError,

    bonusTimingIsLoading: state.firestore.bonusTimingIsLoading,
    bonusTimings: state.firestore.bonusTimings,
    bonusTimingsErrors: state.firestore.bonusTimingsErrors,

    updatingBonusTime: state.firestore.updatingBonusTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLiveAuctionList: () => dispatch(fetchLiveAuctionList()),
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    fetchLiveRoutesList: () => dispatch(fetchLiveRoutesList()),
    uploadBonusTime: (startTime, endTime) =>
      dispatch(uploadBonusTime(startTime, endTime)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveAuctionList);
