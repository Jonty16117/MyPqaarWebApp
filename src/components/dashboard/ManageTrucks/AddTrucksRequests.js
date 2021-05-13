import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import styles from "../../../styles/AddTrucksRequests.module.css";
import Viewer from "react-viewer";
import ic_green_check from "../../../assets/ic_green_check.png";

function AddTruckReqItem(props) {
  const [visible, setVisible] = React.useState(false);

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
        <p>Truck RC:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.TruckRC}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>Truck Owner:&nbsp;</p>
        <p style={{ fontWeight: "bold" }}>
          {props.FirstName}&nbsp;{props.LastName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
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
        <br/>
        <button type="button" className="btn btn-success btn-sm">Accept</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-danger btn-sm">Reject</button>
      </div>
    </React.Fragment>
  );
}

function AddTrucksRequests(props) {
  const obj = {
    TruckNo: "PB31XXXX",
    TruckRC: "PB1234XXXXX",
    FirstName: "Punnu",
    LastName: "Driver",
    Timestamp: new Date(),
  };
  return (
    <>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: "bold" }}>
          Add Trucks Requests
        </Card.Header>
        <Card.Body>
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
          <AddTruckReqItem
            TruckNo={"PB31XXXX"}
            TruckRC={"PB1234XXXXX"}
            FirstName={"Punnu"}
            LastName={"Driver"}
            Timestamp={new Date()}
            FrontRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
            BackRCURL={
              "https://firebasestorage.googleapis.com/v0/b/pqaar-1841d.appspot.com/o/TruckRC%2FDemoUserTO%2FFront%2Frc_front.jpeg?alt=media&token=f36fb303-4f02-437c-986a-83d38964459f"
            }
          />
        </Card.Body>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: true,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrucksRequests);
