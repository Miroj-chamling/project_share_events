import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    tags: "",
    code: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      //updating the form logic
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      tags: "",
      code: "",
      selectedFile: "",
    });
  };
  return (
    <Paper style={{ padding: "20px" }}>
      <form autoComplete="off" onSubmit={onSubmitHandler}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          style={{ marginBottom: "16px" }}
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          required
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          style={{ marginBottom: "16px" }}
          required
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          style={{ marginBottom: "16px" }}
          required
          name="code"
          variant="outlined"
          label="code"
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
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
