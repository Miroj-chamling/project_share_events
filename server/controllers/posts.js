//controllers are created to handle routes in more effecient way. If we had to code all the login into routes/posts.js
//then the file would have been very messy and difficult to understand and modify.

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//getting all the post which has been placed in the data base
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); //.find in a method of mongoose , it will take some time to look up to the db so we have use async await to handle it effeciently.
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//creatng a new post form the front end and passing it into the backend and adding it into the database.

export const createPost = async (req, res) => {
  const post = req.body; //the post is sent from the frontend of the app.

  const newPost = new PostMessage(post); //new post from the app accoding to the PostMessage Schema.

  try {
    await newPost.save(); // .save() is a function if mongo db to save new data into the database.
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found!");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found!");
  await PostMessage.findByIdAndRemove(id);
  console.log(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post Found!");
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
