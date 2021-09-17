import { AUCTIONS_INFO, BONUS_TIMINGS } from "../../utils/consts.js";

export const uploadBonusTime = (startTime, endTime) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "UPDATING_BONUS_TIME" });
    const firestore = getFirestore();
    firestore
      .collection(AUCTIONS_INFO)
      .doc(BONUS_TIMINGS)
      .update({ StartTime: startTime, EndTime: endTime })
      .then(() => {
        dispatch({ type: "UPDATED_BONUS_TIME" });
      });
  };
};
