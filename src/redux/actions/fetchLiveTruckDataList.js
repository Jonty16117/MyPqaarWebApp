import { LIVE_TRUCK_DATA_LIST } from "../../utils/consts.js";

//data initializers
let liveTruckDataList = new Map();

//get live truck data list
export const fetchLiveTruckDataList = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(LIVE_TRUCK_DATA_LIST).onSnapshot((trucks) => {
      dispatch({ type: "LOADING_LIVE_TRUCK_DATA_LIST" });
      liveTruckDataList.clear();
      trucks.forEach((truck) => {
        if (truck.id !== "DummyDoc") {
          liveTruckDataList.set(truck.data().TruckNo, truck.data());
        }
      });
      dispatch({
        type: "FETCHED_LIVE_TRUCK_DATA_LIST",
        payload: liveTruckDataList,
      });
      dispatch({ type: "LOADED_LIVE_TRUCK_DATA_LIST" });
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
