let lastAucListDoc = null;
let liveTruckDataList = null;
let trucksInLastAuc = null;
let pahunchs = null;

function truckIsEligibleForAuction(truckNo) {
  if (liveTruckDataList.get(truckNo).Active === "false") {
    return false;
  }

  if (liveTruckDataList.get(truckNo).Status === "DelInProg") {
    return false;
  }

  if (liveTruckDataList.get(truckNo).Status === "Unassigned") {
    return true;
  }

  let innerMap = pahunchs.get(liveTruckDataList.get(truckNo).AuctionId);

  let truckPahunchCorrect =
    pahunchs.has(liveTruckDataList.get(truckNo).AuctionId) &&
    pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).has(truckNo) &&
    pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).get(truckNo)
      .Source === liveTruckDataList.get(truckNo).Source &&
    pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).get(truckNo)
      .Destination === liveTruckDataList.get(truckNo).Destination &&
    pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).get(truckNo)
      .Timestamp.seconds *
      1000 >
      Number(liveTruckDataList.get(truckNo).Timestamp) * 1000;
  if (liveTruckDataList.get(truckNo).Status === "DelPass") {
    truckPahunchCorrect =
      truckPahunchCorrect &&
      pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).get(truckNo)
        .Status === "Accepted";
  } else if (liveTruckDataList.get(truckNo).Status === "DelFail") {
    truckPahunchCorrect =
      truckPahunchCorrect &&
      pahunchs.get(liveTruckDataList.get(truckNo).AuctionId).get(truckNo)
        .Status === "Rejected";
  }
  

  return truckPahunchCorrect;
}

export const draftLiveAuctionList = (perUserBidDurationInMillis) => {
  return (dispatch, getState) => {
    dispatch({ type: "DRAFTING_LIVE_AUCTION_LIST" });
    let lastOpenClosedLists = { lastOpen: [], lastClosed: [], lastMissed: [] };
    trucksInLastAuc = new Map();
    lastAucListDoc = getState().firestore.lastAucListDoc;
    liveTruckDataList = getState().firestore.liveTruckDataList;
    pahunchs = getState().firestore.pahunchs;

    // console.log("pahunchs: ", pahunchs);
    // console.log("lastAuctionList in draftLiveAuctionList: ", lastAucListDoc);

    //Separate last open and closed trucks into two different lists
    for (let i = 1; i < lastAucListDoc.size; i++) {
      if (truckIsEligibleForAuction(lastAucListDoc.get(`${i}`).TruckNo)) {
        trucksInLastAuc.set(lastAucListDoc.get(`${i}`).TruckNo, true);
        let newEntryInLAL = {
          PrevNo: i,
          TruckNo: lastAucListDoc.get(`${i}`).TruckNo,
        };
        if (lastAucListDoc.get(`${i}`).Closed === "true") {
          lastOpenClosedLists.lastClosed.push(newEntryInLAL);
        } else {
          lastOpenClosedLists.lastOpen.push(newEntryInLAL);
        }
      }
    }

    /**
     * Get the trucks which which missed last auction:
     * if there is a truck which was not in the last auction
     * and whose status is "not in progress", initialize it in the
     * last missed list.
     *
     * Note: The timestamp added in the missed list here, is just to do sorting
     * which is done in the next, step. But this timestamp's original motive
     * is to store the timestamp information during the live auction.
     */
    let liveTruckDataListIt = liveTruckDataList.keys();
    for (let i = 0; i < liveTruckDataList.size; i++) {
      let truck = liveTruckDataListIt.next().value;
      if (!trucksInLastAuc.has(truck) && truckIsEligibleForAuction(truck)) {
        let newEntryInLAL = {
          PrevNo: liveTruckDataListIt.get(truck).CurrentListNo,
          TruckNo: truck,
          StartTime: Number(liveTruckDataListIt.get(truck).Timestamp),
        };
        // console.log("starttime: ", Number(liveTruckDataListIt.get(truck).Timestamp))
        lastOpenClosedLists.lastMissed.push(newEntryInLAL);
      }
    }

    // console.log("lastOpenClosedLists: ", lastOpenClosedLists)
    /**
     * sort the newly generated missed list according
     * to the timestamp, in the ascending order
     */
    lastOpenClosedLists.lastMissed.sort((a, b) => a.Timestamp - b.Timestamp);


    /**
     * Combine last closed, last open and last missed list in the following order:
     *
     * Last Missed List -> Last Open List -> Last Closed List
     */
    let draftLiveAuctionList = [];
    draftLiveAuctionList = draftLiveAuctionList.concat(lastOpenClosedLists.lastMissed);
    draftLiveAuctionList = draftLiveAuctionList.concat(lastOpenClosedLists.lastOpen);
    draftLiveAuctionList = draftLiveAuctionList.concat(lastOpenClosedLists.lastClosed);

    // console.log("lastOpenClosedLists: ", lastOpenClosedLists.lastOpen)
    // console.log("draftLiveAuctionList: ", draftLiveAuctionList)
    
    /**
     * Assign the sequence numbers and set the starting unlock time
     * to each truck in live auction list.
     */
    let aucStartTime = getState().firestore.aucTimings.StartTime;
    draftLiveAuctionList.forEach((item, index) => {
      item.StartTime = aucStartTime + perUserBidDurationInMillis * index;
      item.CurrNo = `${index + 1}`;
    });

    // console.log("draftLiveAuctionList: ", draftLiveAuctionList)

    dispatch({
      type: "STORE_DRAFTED_LIVE_AUCTION_LIST",
      payload: draftLiveAuctionList,
    });
    dispatch({ type: "DRAFTED_LIVE_AUCTION_LIST" });
  };
};
