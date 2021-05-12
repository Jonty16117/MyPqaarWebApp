import { LIVE_AUCTION_LIST } from "../../utils/consts.js";

export const fetchLiveAuctionList = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "UPDATING_LIVE_AUCTION_LIST" });
    const firestore = getFirestore();
    firestore.collection(LIVE_AUCTION_LIST).onSnapshot((querySnapshot) => {
      
    });
  };
};

dispatch({ type: "SET_LIVE_AUCTION_LIST", payload: lal });
dispatch({ type: "UPDATED_LIVE_AUCTION_LIST" });
dispatch({ type: "UPDATING_LIVE_AUCTION_LIST_ERROR" });
