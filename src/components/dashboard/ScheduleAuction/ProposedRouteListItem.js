import React from "react";
import { Accordion } from "react-bootstrap";
import styles from "../../../styles/ProposedRouteListItem.module.css";

function prlSubItem(destination, trucksNeeded) {
  return (
    <div
      className="shadow-lg p-3 mb-5 bg-green rounded"
      className={styles.prlSubItem}
    >
      <p>Destination:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{destination}</p>
      <p>&#8287;| Trucks needed:&#8287;</p>
      <p style={{ fontWeight: "bold" }}>{trucksNeeded}</p>
    </div>
  );
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
                <p style={{ fontWeight: "bold" }}>Abohar</p>
                <p>&#8287;| Total Mandi Routes:&#8287;</p>
                <p style={{ fontWeight: "bold" }}>34</p>
                <p>&#8287;| Total Mandi Truck Requirement :&#8287;</p>
                <p style={{ fontWeight: "bold" }}>69</p>
              </div>
            </a>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <>
              {/* Test data */}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
              {prlSubItem("FCI", "69")}
            </>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </>
  );
}
