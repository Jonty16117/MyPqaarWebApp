import React from "react";
import { Accordion } from "react-bootstrap";
import styles from "../../../styles/LiveRoutesListItem.module.css";

function lrSubItem(destination, trucksNeeded) {
  return (
    <div
      className="shadow-lg p-3 mb-5 bg-green rounded"
      className={styles.lrSubItem}
    >
      <p>Destination:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{destination}</p>
      <p>&#8287;| Trucks needed:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder={`Default: ${trucksNeeded}`}
        ></input>
      </p>
      <p>&#8287;| Route Rate:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>
        <input
          style={{ marginTop: "2px" }}
          className="form-control form-control-sm"
          type="text"
          placeholder="Enter Route Rate"
        ></input>
      </p>
    </div>
  );
}

function getTotalTrucks(lr) {
  let trucksCount = 0;
  for (let [key, value] of Object.entries(lr)) {
    if (key === "Status" || key === "Timestamp" || key === "Mandi") {
      continue;
    }
    trucksCount += value;
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

export default function LiveRoutesListItem(props) {
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
                <p style={{ fontWeight: "bold" }}>{props.prlItem.Mandi}</p>
                <p>&#8287;| Total Mandi Routes:&#8287;</p>
                <p style={{ fontWeight: "bold" }}>
                  {Object.keys(props.prlItem).length - 3}
                </p>
                <p>&#8287;| Total Mandi Truck Requirement :&#8287;</p>
                <p style={{ fontWeight: "bold" }}>
                  {getTotalTrucks(props.prlItem)}
                </p>
              </div>
            </a>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <>
              {getDestinations(props.prlItem).map((des) => {
                return lrSubItem(des, props.prlItem[des]);
              })}
              {/* Test data */}
              {/* {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")}
              {lrSubItem("FCI", "69")} */}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </>
  );
}
