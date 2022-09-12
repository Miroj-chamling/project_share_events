import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ padding: "16px" }}>
      <CardMedia
        component="img"
        height="194"
        image={post.selectedFile}
        title={post.title}
      />
      <div>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent style={{ padding: 0 }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.code}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp; {post.likeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small"></DeleteIcon>
            Delete
          </Button>
          <Button size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="small" />
            Edit
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
