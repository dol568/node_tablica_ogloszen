import { createContext, useContext, useReducer, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { initialState, reducer } from "./dataReducer";
import URL from "../consts/consts";
import axios from "./axiosInstance";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortParams, setSortParams] = useState({ order: "desc", orderBy: "updatedAt" });
  const [filterParams, setFilterParams] = useState({});
  const [paginationComments, setPaginationComments] = useState({ page: 1, limit: 5 });
  const [paginationAdvertisements, setPaginationAdvertisements] = useState({ page: 1, limit: 5 });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTags();
    fetchCategories();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [sortParams, filterParams, paginationAdvertisements]);

  const fetchData = async () => {
    try {
      let params = {
        ...sortParams,
        ...filterParams,
        page: paginationAdvertisements.page,
        limit: paginationAdvertisements.limit,
        order: sortParams.order,
        orderBy: sortParams.orderBy,
      };

      const response = await axios.get(URL.advertisementsURL, { params });
      dispatch({ type: "FETCH_ADS", payload: response.data.data });
      enqueueSnackbar("Data retrieved", { variant: "success" });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const fetchComments = async (id) => {
    try {
      let params = { page: paginationComments.page, limit: paginationComments.limit };

      const response = await axios.get(URL.advertisementsURL + `/${id}/comments`, { params });
      dispatch({ type: "FETCH_COMMENTS", payload: response.data.data });
    } catch (error) {
      dispatch({ type: "FETCH_COMMENTS_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(URL.usersURL);
      dispatch({ type: "FETCH_USERS", payload: response.data.data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL.categoriesURL);
      dispatch({ type: "FETCH_CATEGORIES", payload: response.data.data });
    } catch (error) {
      dispatch({ type: "FETCH_CATEGORIES_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(URL.tagsURL);
      dispatch({ type: "FETCH_TAGS", payload: response.data.data });
    } catch (error) {
      dispatch({ type: "FETCH_TAGS_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const createAd = async (data) => {
    try {
      await axios.post(URL.advertisementsURL, data, { withCredentials: true });
      enqueueSnackbar("Ad created success", { variant: "success" });
      fetchData();
    } catch (error) {
      dispatch({ type: "CREATE_AD_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const postComment = async (id, data) => {
    try {
      await axios.post(URL.advertisementsURL + `/${id}/comments`, data, { withCredentials: true });
      enqueueSnackbar("Comment posted success", { variant: "success" });
      fetchData();
    } catch (error) {
      console.log(error);
      dispatch({ type: "CREATE_COMMENT_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const updateAd = async (id, data) => {
    try {
      await axios.patch(URL.advertisementsURL + `/${id}`, data, { withCredentials: true });
      enqueueSnackbar("Ad updated success", { variant: "success" });
      fetchData();
    } catch (error) {
      dispatch({ type: "UPDATE_AD_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
    }
  };

  const updateComment = async (id, commentId, data) => {
    try {
      await axios.patch(URL.advertisementsURL + `/${id}/comments/${commentId}`, data, { withCredentials: true });
      enqueueSnackbar("Comment updated success", { variant: "success" });
      fetchData();
    } catch (error) {
      dispatch({ type: "UPDATE_COMMENT_ERROR", payload: error.message });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const deleteAd = async (id) => {
    try {
      await axios.delete(URL.advertisementsURL + `/${id}`, { withCredentials: true });
      enqueueSnackbar("Ad deleted success", { variant: "success" });
      fetchData();
    } catch (error) {
      dispatch({ type: "DELETE_AD_ERROR", payload: error });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const deleteComment = async (id, commentId) => {
    try {
      await axios.delete(URL.advertisementsURL + `/${id}/comments/${commentId}`, { withCredentials: true });
      enqueueSnackbar("Comment deleted success", { variant: "success" });
      fetchData();
    } catch (error) {
      dispatch({ type: "DELETE_COMMENT_ERROR", payload: error });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const likeComment = async (id, commentId) => {
    try {
      const response = await axios.post(URL.advertisementsURL + `/${id}/comments/${commentId}/like`, null, {
        withCredentials: true,
      });
      dispatch({ type: "LIKE_COMMENT_SUCCESS", payload: response.data });
      enqueueSnackbar("Comment successfully liked", { variant: "success" });
    } catch (error) {
      dispatch({ type: "LIKE_COMMENT_ERROR", payload: error });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  const dislikeComment = async (id, commentId) => {
    try {
      const response = await axios.post(URL.advertisementsURL + `/${id}/comments/${commentId}/dislike`, null, {
        withCredentials: true,
      });
      dispatch({ type: "DISLIKE_COMMENT_SUCCESS", payload: response.data });
      enqueueSnackbar("Comment successfully disliked", { variant: "success" });
    } catch (error) {
      dispatch({ type: "DISLIKE_COMMENT_ERROR", payload: error });
      enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
    }
  };

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        createAd,
        deleteAd,
        updateAd,
        setSortParams,
        setFilterParams,
        paginationAdvertisements,
        setPaginationAdvertisements,
        setPaginationComments,
        postComment,
        deleteComment,
        updateComment,
        likeComment,
        dislikeComment,
        filterParams,
        sortParams,
        fetchComments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
