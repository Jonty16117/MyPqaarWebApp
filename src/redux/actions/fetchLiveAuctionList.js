import { LIVE_ROUTES_LIST } from "../../utils/consts.js";

export const fetchLiveAuctionList = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "LOADING_PRL" });
    const firestore = getFirestore();
    firestore.collection(LIVE_ROUTES_LIST).onSnapshot((querySnapshot) => {
      
    });
  };
};

dispatch({ type: "STORE_PRL", payload: prl });
dispatch({ type: "LOADED_PRL" });
