import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  EDIT_POST,
  GET_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case EDIT_POST:
      let posts = state.posts.slice();
      let index = posts.findIndex(post => post._id === action.payload._id);
      posts.splice(index, 1, action.payload);

      return {
        ...state,
        posts: posts,
        post: action.payload
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
