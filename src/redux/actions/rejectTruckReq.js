import { TRUCKS_REQ } from "../../utils/consts.js";

const rejRemoveTruckReq = (truckNo) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "ADDING_TRUCK" });
    const firestore = getFirestore();
    //remove add truck request
    firestore
      .collection(TRUCKS_REQ)
      .doc(truckNo)
      .update({RequestStatus: "Rejected"})
      .then(() => {
        console.log("no error")
        dispatch({ type: "ADDED_TRUCK" });
      })
      .catch((error) => {
        console.log("error: ", error)
        dispatch({ type: "ADDED_TRUCK" });
      });
  };
};

export default rejRemoveTruckReq
