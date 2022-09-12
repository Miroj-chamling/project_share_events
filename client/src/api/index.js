//here we are using axios to fetch the data from our local server.
import axios from "axios";

const url = "http://localhost:3000/posts"; //this is our local server created with node js.

export const fetchPosts = () => axios.get(url); //we are using axios.get to fetch the data from the local server.
export const createPost = (newPost) => axios.post(url, newPost); //post request to the server.
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
