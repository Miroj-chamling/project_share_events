import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../components/posts/posts";
import Form from "../components/form/form";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justtfy="space-between"
          alignItems="stretch"
          spacing={6}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
