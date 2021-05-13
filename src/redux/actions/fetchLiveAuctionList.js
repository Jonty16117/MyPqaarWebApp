import {
  LIVE_AUCTION_LIST,
  LIVE_ROUTES_LIST,
  LIVE_TRUCK_DATA_LIST,
} from "../../utils/consts.js";

export const fetchLiveAuctionList = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(LIVE_AUCTION_LIST).onSnapshot((snapshot) => {
      dispatch({ type: "UPDATING_LIVE_AUCTION_LIST" });
      let newList = getState().firestore.updatedLAL;
      let modifiedLALItem = null;
      let lrl = getState().firestore.updatedLRL;
      snapshot.docChanges().forEach((change) => {
        if (change.doc.id !== "DummyDoc") {
          if (change.type === "added") {
            console.log("added new auction item: ", change.doc.data());
            newList.set(change.doc.data().CurrNo, change.doc.data());
          }
          if (change.type === "modified") {
            dispatch({ type: "VERIFYING_NEW_BID_REQUEST" });
            modifiedLALItem = change.doc.data();
            // console.log("Modified city: ", change.doc.data());
            let startTime = Number(change.doc.data().StartTime);
            let closed = change.doc.data().Closed.trim();
            let src =
              change.doc.data().Src.length !== 0
                ? change.doc.data().Src.trim()
                : "";
            let des =
              change.doc.data().Des.length !== 0
                ? change.doc.data().Des.trim()
                : "";
            if (
              Date.now() > startTime &&
              closed === "false" &&
              src.length > 0 &&
              des.length > 0 &&
              lrl.has(`${src}-${des}-Got`)
            ) {
              console.log("incoming bid request");
              //check if the bidd route is still available in the live route list
              let req = Number(lrl.get(`${src}-${des}-Req`).Value);
              let got = Number(lrl.get(`${src}-${des}-Got`).Value);

              console.log("req: ", req);
              console.log("got: ", got);
              if (req - got > 0) {
                console.log("routes are available");
                firestore
                  .collection(LIVE_ROUTES_LIST)
                  .doc(`${src}-${des}-Got`)
                  .update({ Value: got + 1 })
                  .then(() => {
                    console.log("Routes list successfully updated!");
                    console.log("before bonus time")
                    //check to see if the current request falls in bonus time
                    console.log(
                      "bonus start time: ",
                      Number(getState().firestore.bonusTimings.StartTime)
                    );
                    if (
                      Date.now() >=
                        Number(getState().firestore.bonusTimings.StartTime) &&
                      Date.now() <
                        Number(getState().firestore.bonusTimings.EndTime)
                    ) {
                      console.log("bid request in bonus time");
                      firestore
                        .collection(LIVE_AUCTION_LIST)
                        .doc(change.doc.data().CurrNo.trim())
                        .update({ StartTime: 99999999999999 })
                        .then(() => {
                          console.log(
                            "updated auction list item's start time to avoid recursion hell"
                          );
                          console.log(
                            "Bid accepted successfully in bonus time!"
                          );
                          firestore
                            .collection(LIVE_TRUCK_DATA_LIST)
                            .doc(change.doc.data().TruckNo.trim())
                            .update({
                              Source: src,
                              Destination: des,
                              Status: "DelInProg",
                            })
                            .then(() => {
                              console.log("Bid accepted successfully!");
                              dispatch({ type: "VERIFIED_NEW_BID_REQUEST" });
                            })
                            .catch((error) => {
                              // Refresh the page.
                              console.error(
                                "Error accepting bid, please refresh the page: ",
                                error
                              );
                              dispatch({
                                type: "UPDATING_LIVE_AUCTION_LIST_ERROR",
                              });
                            });
                        })
                        .catch((error) => {
                          // Refresh the page.
                          console.error(
                            "Error accepting bid, please refresh the page: ",
                            error
                          );
                          dispatch({
                            type: "UPDATING_LIVE_AUCTION_LIST_ERROR",
                          });
                        });
                    } else {
                      // else the bid does not fall into bonus time, therefore mark it as closed
                      console.log("closing bid  ");
                      firestore
                        .collection(LIVE_AUCTION_LIST)
                        .doc(change.doc.data().CurrNo.trim())
                        .update({ Closed: "true" })
                        .then(() => {
                          console.log(
                            "updated auction list item's start time to avoid recursion hell"
                          );
                          firestore
                            .collection(LIVE_TRUCK_DATA_LIST)
                            .doc(change.doc.data().TruckNo.trim())
                            .update({
                              Source: src,
                              Destination: des,
                              Status: "DelInProg",
                              CurrentListNo: change.doc.data().CurrNo,
                              AuctionId: getState().firestore.aucTimings.StartTime,
                              Timestamp: Date.now(),
                            })
                            .then(() => {
                              console.log("Bid accepted successfully!");
                              dispatch({ type: "VERIFIED_NEW_BID_REQUEST" });
                            })
                            .catch((error) => {
                              // Refresh the page.
                              console.error(
                                "Error accepting bid, please refresh the page: ",
                                error
                              );
                              dispatch({
                                type: "UPDATING_LIVE_AUCTION_LIST_ERROR",
                              });
                            });
                        })
                        .catch((error) => {
                          // Refresh the page.
                          console.error(
                            "Error accepting bid, please refresh the page: ",
                            error
                          );
                          dispatch({
                            type: "UPDATING_LIVE_AUCTION_LIST_ERROR",
                          });
                        });
                    }
                  })
                  .catch((error) => {
                    // Refresh the page.
                    console.error(
                      "Error accepting bid, please refresh the page: ",
                      error
                    );
                    dispatch({ type: "UPDATING_LIVE_AUCTION_LIST_ERROR" });
                  });
              }
            }
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
            newList.delete(change.doc.data().CurrNo);
          }
        }
      });
      dispatch({ type: "SET_LIVE_AUCTION_LIST", payload: newList });
      dispatch({ type: "UPDATED_LIVE_AUCTION_LIST" });
    });
  };
};