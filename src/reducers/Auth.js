
  const InitState = {
    isAuthenticated: false,
    error: null,
    userDetails : null,
    role : 0 ,
  };
  
  const initialState = { ...InitState };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "IS_AUTHENTICATED":
        return { ...state, isAuthenticated: action.payload };
      case "USER_DETAILS":
        return { ...state, userDetails: action.payload };
      case "USER_ROLE":
        return { ...state, role: action.payload };
      case "RESET":
        return { ...state, ...InitState };
      default:
        return state;
    }
  }
  