import { LIVE_ROUTES_LIST } from "../../utils/consts.js";

export const fetchLiveRoutesList = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(LIVE_ROUTES_LIST).onSnapshot((querySnapshot) => {
      dispatch({ type: "UPDATING_LIVE_ROUTES_LIST" });
      let newSources = [];
      let newDestinations = [];
      let newLRL = new Map();
      // console.log("updated firestore");
      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc") {
          let [src, des, data] = doc.id.split("-");
          newLRL.set(doc.id, doc.data());
          if (!newSources.includes(src)) {
            newSources.push(src);
          }
          if (!newDestinations.includes(des)) {
            newDestinations.push(des);
          }
        }
      });
      // console.log("src: ", newSources);
      // console.log("des: ", newDestinations);
      newLRL.set("Sources", newSources);
      newLRL.set("Destinations", newDestinations);
      dispatch({ type: "SET_LIVE_ROUTES_LIST", payload: newLRL });
      dispatch({ type: "UPDATED_LIVE_ROUTES_LIST" });
    });
  };
};
