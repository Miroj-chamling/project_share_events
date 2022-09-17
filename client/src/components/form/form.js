import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    code: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.response?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.response?.name }));
    }
    clear();
  };
  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      title: "",
      tags: "",
      code: "",
      selectedFile: "",
    });
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!user?.response?.name) {
    return (
      <Paper>
        <Typography variant="h5">
          Please Sign in to create posts and like contents.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px" }}>
      <form autoComplete="off" onSubmit={onSubmitHandler}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          {currentId ? "Editing" : "Creating"} a Event
        </Typography>

        <TextField
          style={{ marginBottom: "16px" }}
          required
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({ ...postData, title: capitalize(e.target.value) })
          }
        />
        <TextField
          style={{ marginBottom: "16px" }}
          required
          name="Status"
          variant="outlined"
          label="Status"
          fullWidth
          value={postData.code}
          onChange={(e) => setPostData({ ...postData, code: e.target.value })}
        />
        <TextField
          style={{ marginBottom: "16px" }}
          required
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        ></FileBase>
        <Button
          style={{ marginBottom: "16px", marginTop: "16px" }}
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          style={{ marginBottom: "16px" }}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
