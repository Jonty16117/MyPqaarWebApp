import { LIVE_AUCTION_LIST_RECORDS } from "../../utils/consts.js";

//data initializers
// let lastAuctionListDocument = {};

//get live truck data list
export const fetchLastAuctionListDocument = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let lastAuctionListDocument;
    dispatch({ type: "LOADING_LAST_AUCTION_LIST" });
    // console.log("started fetching document");
    firestore
      .collection(LIVE_AUCTION_LIST_RECORDS)
      .orderBy("Timestamp", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id !== "DummyDoc") {
            // console.log("Fetched last auction document:", doc.data());
            lastAuctionListDocument = doc.data();
          }
        });
        // console.log("Fetched last auction document:", new Map(Object.entries(lastAuctionListDocument)));
        dispatch({
          type: "FETCHED_LAST_AUCTION_LIST",
          payload: new Map(Object.entries(lastAuctionListDocument)),
        });
        dispatch({ type: "LOADED_LAST_AUCTION_LIST" });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch({ type: "LOADED_LAST_AUCTION_LIST" });
      });
  };
};

//utility functions
function objIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//Dispatchers:
// dispatch({ type: "FETCH_AUC_TIMINGS", payload: updatedAuctionsInfo });
// dispatch({
//   type: "FETCH_AUC_TIMINGS_ERROR",
//   payload: "Error fetching auction timings!",
// });
// dispatch({ type: "LOADING_LIVE_TRUCK_DATA_LIST" });
