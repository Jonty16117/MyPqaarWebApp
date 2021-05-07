import React, { Component } from "react";
import styles from "../../../styles/AddRoutes.module.css";
import { Card, Button } from "react-bootstrap";
import ProposedRouteListItem from "./ProposedRouteListItem";
import LiveRoutesListItem from "./LiveRoutesListItem";

export class AddRoutes extends Component {
  prlCount = 6;
  numbers = [1, 2, 3, 4, 5];
  //creating pr list
  prlList = this.numbers.map((number) => (
    <ProposedRouteListItem number={number} />
  ));
  lrList = this.numbers.map((number) => <LiveRoutesListItem number={number} />);

  render() {
    return (
      <div className="container-flud">
        <div className="row">
          <div className="col-sm-6">
            <Card className="text-center">
              <Card.Header style={{ fontWeight: "bold" }}>
                Proposed Mandi Routes List
              </Card.Header>
              <Card.Body>
                {this.prlList}
                <Button variant="primary" style={{ marginTop: "20px" }}>
                  Copy Default To Live Routes List
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                This is the live proposed routes list from all the mandis and is
                up to date in real time.
              </Card.Footer>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card className="text-center">
              <Card.Header style={{ fontWeight: "bold" }}>
                Live Routes List
              </Card.Header>
              <Card.Body>
                {this.lrList}
                <Button variant="primary" style={{ marginTop: "20px" }}>
                  Upload Live Routes List
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                This is the list after editing will can be uploaded based on
                which new auction can be scheduled.
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRoutes;

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
