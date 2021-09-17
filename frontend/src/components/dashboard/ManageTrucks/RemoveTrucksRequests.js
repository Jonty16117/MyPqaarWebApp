import React from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import RemoveTruckReqItem from "./RemoveTruckReqItem";

function RemoveTrucksRequests(props) {
  return (
    <>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: "bold" }}>
          Remove Trucks Requests
        </Card.Header>
        <Card.Body>
        {props.fetchingTruckRequests
            ? null
            : props.fetchedTruckRequests
                .get("RemoveRequests")
                .map((reqItem) => (
                  <RemoveTruckReqItem
                    OwnerUId={reqItem.OwnerUId}
                    TruckNo={reqItem.TruckNo}
                    TruckRC={reqItem.TruckRC}
                    FirstName={reqItem.FirstName}
                    LastName={reqItem.LastName}
                    Timestamp={reqItem.Timestamp}
                    FrontRCURL={reqItem.FrontRCURL}
                    BackRCURL={reqItem.BackRCURL}
                  />
                ))}
        </Card.Body>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    fetchingTruckRequests: state.firestore.fetchingTruckRequests,
    fetchedTruckRequests: state.firestore.fetchedTruckRequests,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

export default connect(mapStateToProps)(RemoveTrucksRequests);
