import React from "react";
import { connect } from "react-redux";
import { Card, Button, Spinner, Modal } from "react-bootstrap";
import AddTruckReqItem from "./AddTruckReqItem";

function AddTrucksRequests(props) {
  // props.fetchTruckRequests();
  return (
    <>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: "bold" }}>
          Add Trucks Requests
        </Card.Header>
        <Card.Body>
          {props.fetchingTruckRequests
            ? null
            : props.fetchedTruckRequests
                .get("AddRequests")
                .map((reqItem) => (
                  <AddTruckReqItem
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
//     // fetchTruckRequests: () => dispatch(fetchTruckRequests()),
//   };
// };

export default connect(mapStateToProps)(AddTrucksRequests);
