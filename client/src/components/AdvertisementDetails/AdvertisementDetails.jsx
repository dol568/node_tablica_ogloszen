import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDataContext } from "../../context/dataContext";
import { useAuthContext } from "../../context/authContext";
import { Box, Button, Container, List, ListItem, Stack, TextField, Typography, Pagination } from "@mui/material";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import AdvertisementInfo from "../AdvertisementInfo/AdvertisementInfo";
import CommentForm from "../CommentForm/CommentForm";
import CommentDetails from "../CommentDetails/CommentDetails";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const AdvertisementDetails = () => {
  let params = useParams();
  const { ...stateAuth } = useAuthContext();
  const {
    setPaginationComments,
    paginationComments,
    state,
    postComment,
    deleteComment,
    updateComment,
    likeComment,
    dislikeComment,
    fetchComments,
  } = useDataContext();

  const [page, setPage] = useState(1);
  const [currentAdId, setCurrentAdId] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [ad, setAd] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAd = () => {
      try {
        const foundAd = state.ads.docs && state.ads.docs.find((ad) => ad.id === params.id);
        if (foundAd) {
          setAd(foundAd);
          fetchComments(params.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAd();
  }, [state.ads, params.id]);

  const handleChange = (event, value) => {
    setPage(value);
    setPaginationComments({ ...paginationComments, page: value });
  };

  const handleClickOpen = (e, id) => {
    e.stopPropagation();
    setOpen(true);
    setCurrentAdId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentAdId(null);
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(params.id, commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikeComment = async (commentId) => {
    try {
      await dislikeComment(params.id, commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitComment = async (data) => {
    try {
      await postComment(params.id, data);
      closeComment();
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateComment = async (e, commentId) => {
    try {
      await updateComment(params.id, commentId, e);
      setEditCommentId(null);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    if (currentAdId) {
      try {
        await deleteComment(params.id, currentAdId);
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
  };

  const openComment = () => {
    setShowComment(true);
    reset();
  };

  const closeComment = () => {
    setShowComment(false);
    reset();
  };

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  const {
    control,
    reset,
    handleSubmit: handleSubmitComment,
    formState: { errors: errorsComment },
  } = useForm();

  return (
    <Container className="details-wrapper">
      <AdvertisementInfo
        ad={ad}
        state={state}
        stateAuth={stateAuth}
        showComment={showComment}
        openComment={openComment}
      />
      {showComment && (
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        <CommentForm
          errorsComment={errorsComment}
          control={control}
          closeComment={closeComment}
          handleSubmitComment={handleSubmitComment(onSubmitComment)}
        />
      </Box>
      )}

      {state.comments.docs && state.comments.docs.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <Typography color="text.secondary" gutterBottom variant="h5" sx={{ mb: 1 }}>
            {`Reviews (${state.comments.totalDocs})`}
          </Typography>
          <List sx={{ color: "#000", width: "80%", mb: 2, border: "solid #dcdcdc 1px", py: 0, borderRadius: 2 }}>
            {state.comments.docs.map((comment, index) => (
              <div key={comment.id}>
                <ListItem sx={{ py: 2, borderRadius: 2 }}>
                  {editCommentId === comment.id ? (
                    <form
                      onSubmit={handleSubmitComment((data) => onUpdateComment(data, comment.id))}
                      style={{ width: "100%" }}
                    >
                      <Stack spacing={2} direction="column" alignItems="center" justifyContent="center">
                        <Controller
                          name="content"
                          control={control}
                          rules={{ required: true }}
                          defaultValue={comment.content}
                          render={({ field }) => (
                            <TextField rows={3} {...field} label="Leave a comment" multiline fullWidth />
                          )}
                        />
                        {errorsComment.content && errorsComment.content.type === "required" ? (
                          <small style={{ color: "red", marginTop: 1 }}>Cannot post an empty comment</small>
                        ) : (
                          ""
                        )}

                        <Controller
                          name="rating"
                          control={control}
                          defaultValue={comment.rating}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box sx={{ mr: 2 }}>Rating</Box>
                              <Rating
                                size="large"
                                {...field}
                                name="rating"
                                onChange={field.onChange}
                                value={Number(field.value)}
                              />
                            </Box>
                          )}
                        />
                        {errorsComment.rating && errorsComment.rating.type === "required" ? (
                          <small style={{ color: "red", marginTop: 1 }}>Cannot post an empty rating</small>
                        ) : (
                          ""
                        )}

                        <Stack spacing={5} direction="row">
                          <Button
                            onClick={() => {
                              setEditCommentId(null);
                              reset();
                            }}
                            variant="outlined"
                          >
                            Hide
                          </Button>
                          <Button type="submit" color="success" variant="contained" className="float-end">
                            Send
                          </Button>
                        </Stack>
                      </Stack>
                    </form>
                  ) : (
                    <CommentDetails
                      state={state}
                      stateAuth={stateAuth}
                      comment={comment}
                      setEditCommentId={setEditCommentId}
                      handleClickOpen={handleClickOpen}
                      handleLikeComment={handleLikeComment}
                      handleDislikeComment={handleDislikeComment}
                    />
                  )}
                </ListItem>
                {index !== state.comments.docs.length - 1 && (
                  <Divider variant="middle" component="li" sx={{ bgcolor: "#dcdcdc" }} />
                )}
              </div>
            ))}
          </List>
          <Pagination
            count={state.comments ? state.comments.totalPages : 1}
            page={page}
            onChange={handleChange}
            sx={{ mb: 3 }}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}

      <ConfirmationDialog
        title="comment"
        open={open}
        handleClose={handleClose}
        handleDialogClick={handleDialogClick}
        handleDelete={handleDeleteComment}
      />
    </Container>
  );
};
export default AdvertisementDetails;
