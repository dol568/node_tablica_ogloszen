import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Rating, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import "./CommentDetails.css";

const CommentDetails = (props) => {
  const { stateAuth, comment, setEditCommentId, handleClickOpen, handleLikeComment, handleDislikeComment } = props;

  const numOfLikes = (comment) => {
    return comment.likes.filter((like) => like.liked).length;
  };
  const numOfDislikes = (comment) => {
    return comment.likes.filter((like) => !like.liked).length;
  };

  return (
    <Box className={"comment-wrapper"}>
      <Box style={{ display: "flex", alignItems: "center", minWidth: "200px" }}>
        <IconButton color="inherit">
          <AccountCircle sx={{ fontSize: 60 }} />
        </IconButton>
        <Typography color="text.secondary" gutterBottom variant="h6">
          {`${comment.author.firstName} ${comment.author.lastName}`}
          <Typography color="text.secondary" gutterBottom sx={{ fontSize: 14 }}>
            {new Date(comment.updatedAt).toLocaleDateString()}
          </Typography>
        </Typography>
      </Box>

      <Stack sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Stack direction="row" style={{ justifyContent: "flex-end", alignItems: "center" }}>
          <>
            {stateAuth.user.id === comment.author.id && (
              <>
                <EditIcon color="success" sx={{ cursor: "pointer" }} onClick={() => setEditCommentId(comment.id)} />
                <DeleteForeverIcon
                  color="error"
                  sx={{ mr: 4, cursor: "pointer" }}
                  onClick={(e) => handleClickOpen(e, comment.id)}
                />
              </>
            )}
            <Rating
              readOnly
              name="simple-controlled"
              max={5}
              sx={{ fontSize: 30 }}
              value={comment.rating}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </>
        </Stack>

        <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16, px: 1.5 }}>
          {comment.content}
        </Typography>
        <Stack direction="row" style={{ justifyContent: "flex-end", alignItems: "center" }}>
          {numOfLikes(comment)}
          {comment.likes.some((like) => like.liked && like.author === stateAuth.user.id) ? (
            <ThumbUpAltIcon onClick={() => handleLikeComment(comment.id)} sx={{ ml: 1, mr: 2, cursor: "pointer" }} />
          ) : (
            <ThumbUpAltOutlinedIcon
              onClick={() => handleLikeComment(comment.id)}
              sx={{ ml: 1, mr: 2, cursor: "pointer" }}
            />
          )}
          {numOfDislikes(comment)}
          {comment.likes.some((like) => !like.liked && like.author === stateAuth.user.id) ? (
            <ThumbDownAltIcon onClick={() => handleDislikeComment(comment.id)} sx={{ ml: 1, cursor: "pointer" }} />
          ) : (
            <ThumbDownAltOutlinedIcon
              onClick={() => handleDislikeComment(comment.id)}
              sx={{ ml: 1, cursor: "pointer" }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CommentDetails;
