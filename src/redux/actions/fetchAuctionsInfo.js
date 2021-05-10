import { AUCTIONS_INFO, SCHEDULED_AUCTIONS } from "../../utils/consts.js";

export const fetchAuctionsInfo = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "AUC_TIME_IS_LOADING" });
    const firestore = getFirestore();
    let updatedAuctionsInfo = {};
    firestore.collection(AUCTIONS_INFO).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === SCHEDULED_AUCTIONS) {
          updatedAuctionsInfo = doc.data();
          dispatch({ type: "FETCH_AUC_TIMINGS", payload: updatedAuctionsInfo });
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
