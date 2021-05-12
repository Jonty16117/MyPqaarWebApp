import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import { Table, Card, Button, Spinner, Modal } from "react-bootstrap";
import styles from "../../../styles/LiveAuctionList.module.css";

class LiveAuctionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingLAL: true,
      // chunkedLAL: null,
      chunkedLAL: [
        [
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
        ],
        [
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
        ],
        [
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
          {
            CurrNo: "1",
            PrevNo: "1",
            StartTime: 112312323,
            TruckNo: "PB30XXXX",
          },
        ],
      ],
    };
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
                <p style={{ margin: "10px 0px 0px 0px" }}>
                  {`Sr. No:${aucItem.CurrNo} Truck No:${aucItem.TruckNo} Prev. No:${aucItem.PrevNo} Unlock Time:${aucItem.StartTime}`}
                </p>
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
            {this.state.chunkedLAL.map((chunkedItem) =>
              this.liveAuctionListGroupItem(chunkedItem)
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LiveAuctionList);
