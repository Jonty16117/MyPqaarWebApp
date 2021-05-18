import { TRUCKS_REQ } from "../../utils/consts.js";

export const fetchTruckRequests = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(TRUCKS_REQ).onSnapshot((querySnapshot) => {
      dispatch({ type: "FETCHING_TRUCK_REQUESTS" });
      
      let newData = new Map();
      newData.set("AddRequests", [])
      newData.set("RemoveRequests", [])
      // console.log("fetching live truck requests")

      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc" && doc.data().RequestStatus === null) {
          //for add requests
          if (doc.data().RequestType === "Add") {
            newData.get("AddRequests").push(doc.data());
          }

          if (doc.data().RequestType === "Remove") {
            newData.get("RemoveRequests").push(doc.data());
          }
        }
      });

      dispatch({ type: "FETCHED_TRUCK_REQUESTS", payload: newData });
    });
  };
};
