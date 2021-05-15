import React from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import ShowAllTrucksItem from "./ShowAllTrucksItem";

function RemoveTrucksRequests(props) {
  return (
    <>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: "bold" }}>All Trucks</Card.Header>
        <Card.Body>
          {props.fetchedLiveTruckDataList
            ? Array.from(props.liveTruckDataList).map(([key, value]) => {
                if (value.Active === "true") {
                  return (
                    <ShowAllTrucksItem
                      OwnerUId={value.OwnerUId}
                      TruckNo={value.TruckNo}
                      FirstName={value.FirstName}
                      LastName={value.LastName}
                      Timestamp={value.Timestamp}
                      CurrentListNo={value.CurrentListNo}
                      Status={value.Status}
                      FrontRCURL={value.FrontRCURL}
                      BackRCURL={value.BackRCURL}
                      TruckRC={value.TruckRC}
                    />
                  );
                }
              })
            : null}
        </Card.Body>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    liveTruckDataList: state.firestore.liveTruckDataList,
    fetchedLiveTruckDataList: state.firestore.fetchedLiveTruckDataList,
  };
};

export default connect(mapStateToProps)(RemoveTrucksRequests);
