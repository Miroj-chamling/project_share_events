//here we show the fetched data from the server.
import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux"; //we use useSelector hook for retriving the data according to the action dispatched in the reducers.
import { Grid, CircularProgress } from "@mui/material";

//import useStyles from "./style";
const Posts = ({ setCurrentId }) => {
  // const classes = useStyles();
  const posts = useSelector((state) => state.posts); //here use use state.posts as we have export default posts from the index.js fo reducers which is our global store.
  console.log(posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={2}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
