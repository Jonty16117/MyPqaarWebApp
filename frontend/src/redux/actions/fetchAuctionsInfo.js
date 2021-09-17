import { AUCTIONS_INFO, SCHEDULED_AUCTIONS, BONUS_TIMINGS } from "../../utils/consts.js";

export const fetchAuctionsInfo = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "AUC_TIME_IS_LOADING" });
    const firestore = getFirestore();
    let updatedAuctionsInfo = {};
    let updatedBonusTimings = {};

    firestore.collection(AUCTIONS_INFO).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc)
        if (doc.id === SCHEDULED_AUCTIONS) {
          updatedAuctionsInfo = doc.data();
          dispatch({ type: "FETCH_AUC_TIMINGS", payload: updatedAuctionsInfo });
        }
        if (doc.id === BONUS_TIMINGS) {
          dispatch({ type: "UPDATING_BONUS_TIME" });
          updatedBonusTimings = doc.data();
          dispatch({ type: "UPDATED_BONUS_TIME" });
          dispatch({ type: "SET_BONUS_TIME", payload: updatedBonusTimings });
        }
      });
    });
    if (Object.keys(updatedAuctionsInfo).length === 0) {
      dispatch({
        type: "FETCH_AUC_TIMINGS_ERROR",
        payload: "Error fetching auction timings!",
      });
    }
    dispatch({ type: "AUC_TIME_IS_LOADED" });
  };
};
