import { ActionTypes } from "../constants/reducersActionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case ActionTypes.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case ActionTypes.UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case ActionTypes.FETCH_ALL:
      return action.payload;
    case ActionTypes.CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
};
