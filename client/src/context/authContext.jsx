import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getInitialState, reducer } from "./authReducer";
import { useSnackbar } from "notistack";
import URL from "../consts/consts";
import axios from "./axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [stateAuth, dispatchAuth] = useReducer(reducer, getInitialState());

  const handleLogIn = async (user) => {
    try {
      const result = await axios.post(URL.loginURL, user, { withCredentials: true });
      if (result) {
        dispatchAuth({
          type: "logIn",
          payload: {
            authenticated: true,
            user: result.data.data,
          },
        });
        enqueueSnackbar(`Login success`, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      const result = await axios.post(URL.logoutURL, { withCredentials: true });
      if (result) {
        dispatchAuth({
          type: "logOut",
          payload: { authenticated: false, user: {} },
        });
        enqueueSnackbar(`Logout success`, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("initialState", JSON.stringify(stateAuth));
  }, [stateAuth]);

  return <AuthContext.Provider value={{ ...stateAuth, handleLogIn, handleLogOut }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
