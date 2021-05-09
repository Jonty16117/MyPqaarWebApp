const initState = {
  prlIsLoading: true,
  prl: [],
};

const firestoreReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_PRL":
      return {
        ...state,
        prlIsLoading: true,
      };
    case "LOADED_PRL":
      return {
        ...state,
        prlIsLoading: false,
      };
    case "STORE_PRL":
      return {
        ...state,
        prl: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default firestoreReducer;
