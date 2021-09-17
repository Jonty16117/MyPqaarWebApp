import { AUCTIONS_INFO, SCHEDULED_AUCTIONS } from "../../utils/consts.js";

export const updateAuctionStartTimings = (startTimeInMilli) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "AUC_TIME_IS_LOADING" });
    const firestore = getFirestore();
    const dataToUpdate = {
      StartTime: startTimeInMilli,
      EndTime: 0,
    };
    firestore
      .collection(AUCTIONS_INFO)
      .doc(SCHEDULED_AUCTIONS)
      .update(dataToUpdate)
      .then(() => {
        console.log("updated auction schedule timing: ", dataToUpdate)
        dispatch({ type: "FETCH_AUC_TIMINGS_", payload: dataToUpdate });
        dispatch({ type: "AUC_TIME_IS_LOADED" });
      })
      .catch((error) => {
        console.log("falied to update auction schedule timing: ", dataToUpdate, error)
        let err = "Error fetching auction timings!";
        dispatch({ type: "FETCH_AUC_TIMINGS_ERROR", payload: err });
      });
  };
};
