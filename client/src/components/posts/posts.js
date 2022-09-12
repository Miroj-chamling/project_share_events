import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
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
