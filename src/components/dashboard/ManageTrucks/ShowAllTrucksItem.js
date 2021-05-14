import React from "react";
import { useState } from "react";
import styles from "../../../styles/ShowAllTrucksItem.module.css";
import Viewer from "react-viewer";


function ShowAllTrucksItem(props) {
  const [visible, setVisible] = useState(false);

  const handleImageClick = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  return (
    <React.Fragment>
      <div
        className="container"
        className={styles.liveAuctionListItem}
        // key={prop.Timestamp}
      >
        <p>Truck No:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.TruckNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Current pqaar no:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.CurrentListNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Status:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.Status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Truck RC:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.TruckRC}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Truck Owner:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.FirstName}&nbsp;{props.LastName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <br />
        <p>Front RC:&nbsp;</p>
        <a href="#" onClick={handleImageClick}>
          <img
            className={styles.ic_lock}
            src={props.FrontRCURL}
            alt="Front RC"
          ></img>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p>Back RC:&nbsp;</p>
        <a href="#" onClick={handleImageClick}>
          <img
            className={styles.ic_lock}
            src={props.BackRCURL}
            alt="Back RC"
          ></img>
        </a>
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={[
            { src: props.FrontRCURL, alt: "Front RC" },
            { src: props.BackRCURL, alt: "Back RC" },
          ]}
          className={styles.ic_lock}
        />
        </div>
    </React.Fragment>
  );
}

export default ShowAllTrucksItem;
