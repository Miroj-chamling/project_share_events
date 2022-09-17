import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  creator: String,
  title: String,
  code: String,
  tags: [String],
  likes: {
    type: [String],
    default: [],
  },
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
