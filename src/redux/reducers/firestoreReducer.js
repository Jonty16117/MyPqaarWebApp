const initState = {
  prlIsLoading: true,
  prl: [],
};

const firestoreReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_PRL":
      console.log("LOADING_PRL");
      return {
        ...state,
        prlIsLoading: true,
      };
    case "LOADED_PRL":
      console.log("LOADED_PRL");
      return {
        ...state,
        prlIsLoading: false,
      };
    case "STORE_PRL":
      console.log("STORE_PRL");
      console.log("action.payload.prl: ", action.payload)
      return {
        ...state,
        prl: action.payload,
      };
    default:
      console.log("returning default firestore state: ", state);
      return {
        ...state,
      };
  }
};

export default firestoreReducer;
