export const separateOpenCloseLists = (lastAuctionList) => {
  let lastOpenClosedLists = { lastOpen: [], lastClosed: [] };
  return (dispatch, getState) => {
      console.log("lastAuctionList inseparateOpenCloseLists: ", getState().firestore.lastAucListDoc)
    // lastAuctionList.forEach((listItem) => {
    //   console.log(listItem);
    // });
    dispatch({ type: "SET_LAST_OPEN_CLOSED", payload: lastOpenClosedLists });
  };
};
