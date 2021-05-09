import React, { Component, useRef } from "react";
import styles from "../../../styles/AddRoutes.module.css";
import { Card, Button, Spinner } from "react-bootstrap";
import store from "../../../redux/store";
import { fetchPRL } from "../../../redux/actions/fetchPRL";
import { connect } from "react-redux";
import ProposedRouteListItem from "./ProposedRouteListItem";
import LiveRoutesListItem from "./LiveRoutesListItem";

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

  validateLRLData() {
    let data = store.getState().localData.draftLRL;
    let isValid = true
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
    if (this.validateLRLData()) {
      this.setState({ lRLDataErrorAlert: false });
    } else {
      this.setState({ lRLDataErrorAlert: true });
      //upload to firestore
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
                  <Button variant="primary" style={{ marginTop: "20px" }}>
                    Copy Default To Live Routes List
                  </Button>
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
                    Upload Live Routes List
                  </Button>
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
  };
};

export default connect(null, mapDispatchToProps)(AddRoutes);
