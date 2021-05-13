import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchLiveAuctionList } from "../../../redux/actions/fetchLiveAuctionList";
import { fetchAuctionsInfo } from "../../../redux/actions/fetchAuctionsInfo";
import { fetchLiveRoutesList } from "../../../redux/actions/fetchLiveRoutesList";
import { Table, Card, Button, Spinner, Modal } from "react-bootstrap";
import styles from "../../../styles/LiveAuctionList.module.css";
import Timer from "react-compound-timer";
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
    };
    this.props.fetchLiveAuctionList();
    this.props.fetchAuctionsInfo();
    this.props.fetchLiveRoutesList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        updatingLAL: nextProps.updatingLAL,
      },
      () => {
        this.setState({ chunkedLAL: nextProps.updatedLAL });
      }
    );
  }

  liveAuctionListGroupItem = (chunkedItem) => {
    return (
      <Accordion defaultActiveKey="0">
        <div className="container-flud collapsible">
          <Accordion.Toggle as={"div"} eventKey="1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
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
                  {/* {aucItem.StartTime <= Date.now() ? (
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
                  )} */}
                </div>
              ))}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card className="text-center">
          <Card.Header style={{ fontWeight: "bold" }}>
            <p style={{ textAlign: "center", margin: "0" }}>
              Live Auction List
            </p>
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
              this.state.chunkedLAL.map((chunkedItem) =>
                this.liveAuctionListGroupItem(chunkedItem)
              )
            )}
          </Card.Body>
          <Card.Footer className="text-muted">
            <p style={{ fontSize: "15px", margin: "0" }}>
              Click on any auction list range to view live auction list in that
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
    verifiedNewBidReq: state.firestore.verifiedNewBidReq,

    updatingLAL: state.firestore.updatingLAL,
    updatedLAL: chunkedLAL,
    updatingLALError: state.firestore.updatingLALError,

    bonusTimingIsLoading: state.firestore.bonusTimingIsLoading,
    bonusTimings: state.firestore.bonusTimings,
    bonusTimingsErrors: state.firestore.bonusTimingsErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLiveAuctionList: () => dispatch(fetchLiveAuctionList()),
    fetchAuctionsInfo: () => dispatch(fetchAuctionsInfo()),
    fetchLiveRoutesList: () => dispatch(fetchLiveRoutesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveAuctionList);
