import { PAHUNCHS } from "../../utils/consts.js";

export const fetchPahunchs = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let pahunchs;
    dispatch({ type: "LOADING_PAHUNCHS" });
    firestore
      .collection(PAHUNCHS)
      .get()
      .then((pahunchsDocs) => {
        pahunchs = new Map();
        // console.log("all pahunchs: ", pahunchsDocs);
        pahunchsDocs.forEach((pahunch) => {
          if (pahunch.id !== "DummyDoc") {
            if (pahunchs.has(pahunch.data().AuctionId)) {
              pahunchs.get(pahunch.data().AuctionId)[
                pahunch.data().TruckNo
              ] = pahunch.data();
            } else {
              let newPahunchAdminEntry = new Map();
              newPahunchAdminEntry.set(pahunch.data().TruckNo, pahunch.data())
              pahunchs.set(pahunch.data().AuctionId, newPahunchAdminEntry);
              // pahunchs.get(pahunch.data().AuctionId)[
              //   pahunch.data().TruckNo
              // ] = pahunch.data();
            }
          }
        });
        dispatch({
          type: "FETCHED_PAHUNCHS",
          payload: pahunchs,
        });
        dispatch({ type: "LOADED_PAHUNCHS" });
      })
      .catch((error) => {
        // console.log("Error getting documents:", error);
        dispatch({ type: "LOADED_PAHUNCHS" });
      });
  };
};
