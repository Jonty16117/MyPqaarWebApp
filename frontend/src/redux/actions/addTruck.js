import {
  USER_DATA,
  LIVE_TRUCK_DATA_LIST,
  TRUCKS_REQ,
} from "../../utils/consts.js";

const addTruck = (ownerUId, truckNo, ownerFirstName, ownerLastName, frontRCURL, backRCURL, truckRC) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "ADDING_TRUCK" });
    const firestore = getFirestore();
    //adding truck to user's database
    firestore
      .collection(USER_DATA)
      .doc(ownerUId)
      .update({
        Trucks: firestore.FieldValue.arrayUnion(truckNo),
      });

    //adding truck entry in live truck data list
    let dataToUpload = {
      TruckNo: truckNo,
      Active: "true",
      OwnerFirstName: ownerFirstName,
      OwnerLastName: ownerLastName,
      AuctionId: null,
      CurrentListNo: null,
      Destination: null,
      Source: null,
      Status: "Unassigned",
      Timestamp: firestore.FieldValue.serverTimestamp(),
      FrontRCURL: frontRCURL,
      BackRCURL: backRCURL,
      TruckRC: truckRC,
    };
    firestore.collection(LIVE_TRUCK_DATA_LIST).doc(truckNo).set(dataToUpload);

    //remove add truck request at the end
    firestore
      .collection(TRUCKS_REQ)
      .doc(truckNo)
      .delete()
      .then(() => {
        dispatch({ type: "ADDED_TRUCK" });
      })
      .catch((error) => {
        dispatch({ type: "ADDED_TRUCK" });
      });
  };
};

// .update({ RequestStatus: "Accepted" })
export default addTruck
