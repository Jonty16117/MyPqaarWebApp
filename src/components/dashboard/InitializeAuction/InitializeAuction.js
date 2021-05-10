import React, { Component } from "react";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import { fetchLiveTruckDataList } from "../../../redux/actions/fetchLiveTruckDataList";
import { connect } from "react-redux";
import store from "../../../redux/store";

class InitializeAuction extends Component {
  constructor(props) {
    super(props);

    this.props.fetchLiveTruckDataList();
    store.subscribe(() => {
      console.log(
        "live truck data list: ",
        store.getState().firestore.liveTruckDataList
      );
    });
  }

  render() {
    return (
      <div className="container-flud">
        <Card className="text-center">
          <Card.Header style={{ fontWeight: "bold" }}>
            Initialize new auction list
          </Card.Header>
          <Spinner
            animation="border"
            role="status"
            style={{ margin: "100px auto" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>

          <Card.Body>
            <p>build live auction list</p>
            <Button variant="primary" style={{ marginTop: "20px" }}>
              Copy Default To Live Routes List
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            <p style={{ fontSize: "10px", margin: "0" }}></p>
          </Card.Footer>
        </Card>
        Initialize Auction
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLiveTruckDataList: () => dispatch(fetchLiveTruckDataList()),
  };
};

export default connect(null, mapDispatchToProps)(InitializeAuction);
