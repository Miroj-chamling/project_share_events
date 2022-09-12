import * as api from "../api/index.js"; //using * import we can use all the functions in api files.

//after the action has been dispatched from the app.js
//action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    //fetching the data from the local server with fetchPosts function from api file, which we were able to fetch by importing as *.
    dispatch({ type: "FETCH_ALL", payload: data }); //dipatching the action to the reducers. where what action to be performed in identified by its type and the data is passed as payload.
  } catch (error) {
    console.log(error.message); //some simple error handling.
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {}
};
