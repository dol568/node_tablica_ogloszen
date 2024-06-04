const initialState = { authenticated: false, user: {} };

const getInitialState = () => {
  if (localStorage.getItem("initialState")) {
    return JSON.parse(localStorage.initialState);
  }
  return initialState;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logIn":
      return { authenticated: action.payload.authenticated, user: action.payload.user };
    case "logOut":
      return { authenticated: action.payload.authenticated, user: action.payload.user };
    default:
      return state;
  }
};

export { getInitialState, reducer };
