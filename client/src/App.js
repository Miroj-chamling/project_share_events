import React, { useState, useEffect } from "react";
import MuiNavbar from "./components/navbar/navbar";
import "./App.css";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "./components/posts/posts";
import Form from "./components/form/form";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch(); //we use dispatch hook to dispatch the action that we have created.

  //useEffect hook is used fetch data, render changed data on the first load.
  useEffect(() => {
    dispatch(getPosts()); //we dispatch the action getposts as soon the website renders.
  }, [dispatch]);

  return (
    <>
      <MuiNavbar />
      <Container maxWidth="lg" style={{ marginTop: "26px" }}>
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
      </Container>
    </>
  );
};

export default App;
