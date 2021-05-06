const initState = {
  isLoggedIn: null,
  sentRegisterRequest: null,
  sentResetMail: null
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
    case "REGISTER_SUCCESSFUL":
      console.log("REGISTER_SUCCESSFUL");
      return {
        ...state,
        sentRegisterRequest: true,
      };
    case "REGISTER_FAILED":
      console.log("REGISTER_FAILED");
      return {
        ...state,
        sentRegisterRequest: false,
      };
      case "SENT_RESET_MAIL":
      console.log("SENT_RESET_MAIL");
      return {
        ...state,
        sentResetMail: true,
      };
      case "FAILED_TO_SENT_RESET_MAIL":
      console.log("FAILED_TO_SENT_RESET_MAIL");
      return {
        ...state,
        sentResetMail: false,
      };
    default:
      console.log("returning default state: ", state);
      return {
        ...state,
      };
  }
};

export default authReducer;
