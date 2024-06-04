import { Box, Button, Card, CardContent, Rating, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const CommentForm = (props) => {
  const { errorsComment, control, handleSubmitComment, closeComment = { closeComment } } = props;

  return (
    <Card elevation={0} sx={{ mb: 2, width: "80%", border: "solid 0.2px #c1c2c8" }}>
      <CardContent>
        <form onSubmit={handleSubmitComment}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Controller
              name="content"
              control={control}
              rules={{ required: true, minLength: 10 }}
              defaultValue=""
              render={({ field }) => <TextField rows={3} {...field} label="Leave a comment" multiline fullWidth />}
            />
            {errorsComment.content && errorsComment.content.type === "required" ? (
              <small style={{ color: "red", marginTop: 1 }}>Cannot post an empty comment</small>
            ) : errorsComment.content && errorsComment.content.type === "minLength" ? (
              <small style={{ color: "red" }}>Comment must be at least 10 characters</small>
            ) : (
              ""
            )}

            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 2 }}>Rating</Box>
                  <Rating size="large" {...field} name="rating" onChange={field.onChange} value={Number(field.value)} />
                </Box>
              )}
            />
            {errorsComment.rating && errorsComment.rating.type === "required" ? (
              <small style={{ color: "red", marginTop: 1 }}>Cannot post an empty rating</small>
            ) : (
              ""
            )}

            <Stack spacing={5} direction="row">
              <Button onClick={closeComment} variant="outlined">
                Hide
              </Button>
              <Button type="submit" color="success" variant="contained" className="float-end">
                Send
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
