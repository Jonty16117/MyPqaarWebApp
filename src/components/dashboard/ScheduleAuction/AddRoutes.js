import React, { Component } from "react";
import styles from "../../../styles/AddRoutes.module.css";
import { Card, Button, Spinner } from "react-bootstrap";
import store from "../../../redux/store";
import { fetchPRL } from "../../../redux/actions/fetchPRL";
import { connect } from "react-redux";
import ProposedRouteListItem from "./ProposedRouteListItem";
import LiveRoutesListItem from "./LiveRoutesListItem";

class AddRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prlIsLoading: true,
      prl: [],
    };
    this.props.fetchPRL();
    store.subscribe(() => {
      this.setState({
        prlIsLoading: store.getState().firestore.prlIsLoading,
      });
    });
    store.subscribe(() => {
      this.setState({
        prl: store.getState().firestore.prl,
      });
      {
        console.log("subscribed prl ", store.getState().firestore.prl);
      }
    });
  }

  // prlCount = 6;
  numbers = [1, 2, 3, 4, 5];
  //creating pr list
  // prlList = this.state.prl.map((prlItem) => (
  //   <ProposedRouteListItem prlItem={prlItem} />
  // ));
  // lrList = this.numbers.map((number) => <LiveRoutesListItem number={number} />);

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
                  {this.state.prl.map((prlItem) => {
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
                  {this.state.prl.map((prlItem) => {
                    return (
                      <LiveRoutesListItem
                        prlItem={prlItem}
                        key={prlItem.Mandi}
                      />
                    );
                  })}
                  <Button variant="primary" style={{ marginTop: "20px" }}>
                    Upload Live Routes List
                  </Button>
                </Card.Body>
              )}
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

// const mapStateToProps = (state) => {
//   return {
//     prlIsLoading: state.firestore.prlIsLoading,
//     prl: state.firestore.prl,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPRL: () => dispatch(fetchPRL()),
  };
};

export default connect(null, mapDispatchToProps)(AddRoutes);

{
  /* <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body> */
}

{
  /* <div className="container">
<div className="row">
  <div className="col-sm" style={{ backgroundColor: "blue" }}>
    {this.prlList}
  </div>
  <div className="col-sm">{this.lrList}</div>
</div>
</div> */
}

{
  /* <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6" style={{ backgroundColor: "blue" }}>
            <div className="container">content</div>
          </div>
          <div className="col-xs-6"style={{ backgroundColor: "red" }} >
            <div className="container">content</div>
          </div>
        </div>
      </div> */
}
