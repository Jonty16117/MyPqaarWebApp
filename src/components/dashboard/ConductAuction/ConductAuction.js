import React, { Component } from "react";
import { Table, Card, Button, Spinner, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchLiveRoutesList } from "../../../redux/actions/fetchLiveRoutesList";
import styles from "../../../styles/ConductAuction.module.css";

export class ConductAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatingLRL: true,
      updatedLRL: this.props.updatedLRL,
    };
    this.props.fetchLiveRoutesList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      updatingLRL: nextProps.updatingLRL,
      updatedLRL: nextProps.updatedLRL,
    });
  }

  testData = () => {
    return <h1>{`${this.state.updatedLRL.get("Destinations")}`}</h1>;
  };

  displayDes = () => {
    return (
      <React.Fragment>
        <tr>
          <th>Mandi\Godowns</th>
          {this.state.updatedLRL.get("Destinations").map((des) => (
            <th key={des}>{des}</th>
          ))}
        </tr>
      </React.Fragment>
    );
  };

  displayData = () => {
    return (
      <React.Fragment>
        {this.state.updatedLRL.get("Sources").map((src) => (
          <tr>
            <th className="bg-dark text-white" key={src}>
              {src}
            </th>
            {this.state.updatedLRL.get("Destinations").map((des) =>
              this.state.updatedLRL.has(`${src}-${des}-Got`) ? (
                <>
                  <td key={des}>
                    {this.state.updatedLRL.get(`${src}-${des}-Got`).Value}/
                    {this.state.updatedLRL.get(`${src}-${des}-Req`).Value}
                  </td>
                </>
              ) : (
                <td>-/-</td>
              )
            )}
          </tr>
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Card.Header style={{ fontWeight: "bold" }}>
          <p style={{ textAlign: "center", margin: "0" }}>Live Routes List</p>
        </Card.Header>
        {/* {this.testData()} */}
        {this.state.updatingLRL ? (
          <div style={{
            textAlign: "center",
            marginTop: "0px",
          }}>
          <Spinner
            animation="border"
            role="status"
            style={{ margin: "150px auto" }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
          </div>
        ) : (
          <Table striped borderless hover responsive size="sm">
            <React.Fragment>
              <thead className="thead-dark">{this.displayDes()}</thead>
              <tbody>{this.displayData()}</tbody>
              <tbody>{this.displayData()}</tbody>
              <tbody>{this.displayData()}</tbody>
              <tbody>{this.displayData()}</tbody>
              <tbody>{this.displayData()}</tbody>
              <tbody>{this.displayData()}</tbody>
            </React.Fragment>
          </Table>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updatingLRL: state.firestore.updatingLRL,
    updatedLRL: state.firestore.updatedLRL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLiveRoutesList: () => dispatch(fetchLiveRoutesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConductAuction);
