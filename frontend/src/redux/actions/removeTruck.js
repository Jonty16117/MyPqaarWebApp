import {
    USER_DATA,
    LIVE_TRUCK_DATA_LIST,
    TRUCKS_REQ,
  } from "../../utils/consts.js";
  
  const addTruck = (ownerUId, truckNo, ownerFirstName, ownerLastName) => {
    return (dispatch, getState, { getFirestore }) => {
      dispatch({ type: "REMOVING_TRUCK" });
      const firestore = getFirestore();
      //removing truck from user's database
      firestore
        .collection(USER_DATA)
        .doc(ownerUId)
        .update({
          Trucks: firestore.FieldValue.arrayRemove(truckNo),
        });
  
      //deactivating truck entry in live truck data list
      firestore.collection(LIVE_TRUCK_DATA_LIST).doc(truckNo).update({Active: "false",});
  
      //remove add truck request at the end
      firestore
        .collection(TRUCKS_REQ)
        .doc(truckNo)
        .delete()
        .then(() => {
          dispatch({ type: "REMOVED_TRUCK" });
        })
        .catch((error) => {
          dispatch({ type: "REMOVED_TRUCK" });
        });
      };
    };
    
    // .update({ RequestStatus: "Accepted" })
    export default addTruck
    