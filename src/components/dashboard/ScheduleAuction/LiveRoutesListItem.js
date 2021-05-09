import React, { Component, useState } from "react";
import { Accordion } from "react-bootstrap";
import styles from "../../../styles/LiveRoutesListItem.module.css";
import store from "../../../redux/store";
import { connect } from "react-redux";
import { updateDraftLRL } from "../../../redux/actions/updateDraftLRL";

function lrSubItem(destination, trucksNeeded, handleChange, itemIndex) {
  return (
    <div
      className="shadow-lg p-3 mb-5 bg-green rounded"
      className={styles.lrSubItem}
      key={destination}
    >
      <p>Destination:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{destination}</p>
      <p>&#8287;| Trucks needed:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder={`Default: ${trucksNeeded}`}
          onChange={(e) => handleChange(e, itemIndex)}
          name="Req"
        ></input>
      </p>
      <p>&#8287;| Route Rate:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>
        <input
          style={{ marginTop: "2px" }}
          className="form-control form-control-sm"
          type="text"
          placeholder="Enter Route Rate"
          onChange={(e) => handleChange(e, itemIndex)}
          name="Rate"
        ></input>
      </p>
    </div>
  );
}

function getTotalTrucks(lrItem) {
  let trucksCount = 0;
  for (let [key, value] of Object.entries(lrItem.Routes)) {
    trucksCount += value.Req;
  }
  return trucksCount;
}

function isARoute(key) {
  if (key === "Status" || key === "Timestamp" || key === "Mandi") {
    return false;
  }
  return true;
}

function getDestinations(lrItem) {
  let desList = [];
  Object.keys(lrItem).map(function (key, index) {
    if (isARoute(key)) {
      desList.push(key);
    }
  });
  desList.sort();
  return desList;
}

class LiveRoutesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lrItem: this.props.lrItem,
    };
  }

  getUpdatedLR(key, value, index) {
    let newLRItem = { ...this.state.lrItem };
    newLRItem.Routes[index][key] = Number(value);
    return newLRItem;
  }

  handleChange = (e, index) => {
    let updatedLR = this.getUpdatedLR(e.target.name, Number(e.target.value), index);
    this.setState({lrItem: updatedLR}, () => {
      let storeLRL = store.getState().localData.draftLRL
      storeLRL[this.props.storeIndex] = updatedLR
      this.props.updateDraftLRL(storeLRL);
    });
  };

  render() {
    return (
      <>
        <Accordion defaultActiveKey="0">
          <div className="container-flud collapsible">
            <Accordion.Toggle as={"div"} eventKey="1">
              <a href="#">
                <div
                  className="shadow-lg p-3 mb-5 bg-green rounded"
                  className={styles.lr_container}
                >
                  <p>Mandi:&#8287;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {this.state.lrItem.Mandi}
                  </p>
                  <p>&#8287;| Total Mandi Routes:&#8287;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {Object.keys(this.state.lrItem.Routes).length}
                  </p>
                  <p>&#8287;| Total Mandi Truck Requirement :&#8287;</p>
                  <p style={{ fontWeight: "bold" }}>
                    {getTotalTrucks(this.state.lrItem)}
                  </p>
                </div>
              </a>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <>
                {getDestinations(this.state.lrItem.Routes).map(
                  (desData, index) => {
                    return lrSubItem(
                      this.state.lrItem.Routes[desData].Des,
                      this.state.lrItem.Routes[desData].Req,
                      this.handleChange,
                      index
                    );
                  }
                )}
              </>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDraftLRL: (updatedLRL) => dispatch(updateDraftLRL(updatedLRL)),
  };
};

export default connect(null, mapDispatchToProps)(LiveRoutesListItem);
