import { Button, ButtonGroup, Card, CardActions, CardContent, Chip, Rating, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdvertisementInfo = (props) => {
  const { ad, stateAuth, showComment, openComment } = props;
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        marginBottom: 2,
        width: "100%",
        border: "solid 0.2px #dcdcdc",
        color: "#000",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Typography variant="h5" component="div">
            {ad.title}
          </Typography>
          {ad.ratingsAverage > 0 ? (
            <Stack spacing={2} direction="row" alignItems="center" gap={1} sx={{ fontSize: 20 }}>
              {`${ad.ratingsAverage}/5`}
              <Rating readOnly value={ad.ratingsAverage} sx={{ fontSize: 30 }} />
            </Stack>
          ) : (
            <span>{"No ratings yet"}</span>
          )}
        </Stack>

        <Typography color="text.secondary" variant="h6">
          {ad.author && `by ${ad.author.firstName} ${ad.author.lastName}`}
        </Typography>

        <Typography color="text.secondary" gutterBottom sx={{ fontSize: 16 }}>
          Published on {new Date(ad.updatedAt).toLocaleDateString()}
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <ButtonGroup variant="contained">
            <Button>{ad.category}</Button>
            <Button variant="text" style={{ color: "#000" }} disabled>
              Category
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="contained">
            <Button variant="text" style={{ color: "#000" }}>
              Price
            </Button>
            <Button>{ad.price}</Button>
          </ButtonGroup>
        </Stack>
        <Typography variant="body2">{ad.content}</Typography>
        <Typography sx={{ mt: 2 }} color="primary">
          Tags:{" "}
        </Typography>
        {ad.tags &&
          ad.tags.map((tag, index) => (
            <Chip sx={{ marginRight: 1 }} key={`${index}`} label={tag} color='primary'></Chip>
          ))}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate(-1)} variant="outlined">
          Go Back
        </Button>

        {stateAuth.authenticated && (
          <ButtonGroup variant="contained">
            {!showComment && (
              <Button color="secondary" onClick={openComment}>
                Leave a Comment
              </Button>
            )}
          </ButtonGroup>
        )}
      </CardActions>
    </Card>
  );
};

export default AdvertisementInfo;
