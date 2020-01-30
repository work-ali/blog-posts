import axios from "axios";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  EDIT_POST,
  GET_POST
} from "./types";

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios.get("/api/posts").then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  );
};

export const getPost = id => dispatch => {
  dispatch(setPostsLoading());
  axios.get(`/api/posts/${id}`).then(res => {
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  });
};

export const addPost = post => dispatch => {
  axios.post("/api/posts", post).then(res =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
};

export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  );
};

export const editPost = (id, postData) => dispatch => {
  axios.patch(`/api/posts/${id}`, postData).then(res =>
    dispatch({
      type: EDIT_POST,
      payload: res.data.post
    })
  );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
