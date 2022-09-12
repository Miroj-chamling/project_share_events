import mongoose from "mongoose";

//preparing a post schema or model for the type of post it will be.
//the post will contain title, code, creator name, tags, likecount or upvote, date of creation.

const postSchema = mongoose.Schema({
  //mongoose the schema is a functuon/method of monoogse to create model/schema.
  creator: String,
  title: String,
  code: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema); //truning the schema into a model.

export default PostMessage; //exporting the post schema so it can be used from other files too.
