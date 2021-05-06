const initState = {
  isLoggedIn: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGIN_FAILED":
      console.log("login failed");
      return {
        ...state,
        isLoggedIn: false,
      };
    case "LOGOUT":
      console.log("logged out");
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      console.log("returning default state: ", state);
      return {
        ...state,
      };
  }
};

export default authReducer;
