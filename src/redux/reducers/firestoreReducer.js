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
    default:
      console.log("returning default firestore state: ", state);
      return {
        ...state,
      };
  }
};

export default firestoreReducer;
