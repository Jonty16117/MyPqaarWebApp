import React from "react";
import { Accordion } from "react-bootstrap";
import styles from "../../../styles/ProposedRouteListItem.module.css";

function prlSubItem(destination, trucksNeeded) {
  return (
    <div
      className="shadow-lg p-3 mb-5 bg-green rounded"
      className={styles.prlSubItem}
      key={destination}
    >
      <p>Destination:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{destination}</p>
      <p>&#8287;| Trucks needed:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{trucksNeeded}</p>
    </div>
  );
}

function getTotalTrucks(prl) {
  let trucksCount = 0;
  for (let [key, value] of Object.entries(prl)) {
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

function getDestinations(prlItem) {
  let desList = [];
  Object.keys(prlItem).map(function (key, index) {
    if (isARoute(key)) {
      desList.push(key);
    }
  });
  desList.sort();
  return desList;
}

export default function ProposedRouteListItem(props) {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <div className="container-flud collapsible">
          <Accordion.Toggle as={"div"} eventKey="1">
            <a href="#">
              <div
                className="shadow-lg p-3 mb-5 bg-green rounded"
                className={styles.prl_container}
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
                return prlSubItem(des, props.prlItem[des]);
              })}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </>
  );
}
