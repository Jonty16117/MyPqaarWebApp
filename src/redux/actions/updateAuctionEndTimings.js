import { AUCTIONS_INFO, SCHEDULED_AUCTIONS } from "../../utils/consts.js";

export const updateAuctionEndTimings = (endTimeInMilli) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "UPLOADING_AUCTION_END_TIME" });
    const firestore = getFirestore();
    const dataToUpdate = {
      EndTime: endTimeInMilli,
    };
    firestore
      .collection(AUCTIONS_INFO)
      .doc(SCHEDULED_AUCTIONS)
      .update(dataToUpdate)
      .then(() => {
        dispatch({ type: "UPLOADED_AUCTION_END_TIME" });
      })
  };
};
