import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";

const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  id,
  onDelete,
  onLike,
  candelete,
  clickOnCard,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );

  const handleDeleteBtnClick = (event) => {
    console.log("id", id);
    event.stopPropagation();
    onDelete(id);
  };

  const handleLikeBtnClick = (event) => {
    console.log("id", id);
    event.stopPropagation();
    onLike(id);
  };

  const handleClickCard = () => {
    clickOnCard(id);
  };

  return (
    <Card square raised onClick={handleClickCard}>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardActionArea>
        <CardHeader title={title} subheader={subTitle}></CardHeader>
      </CardActionArea>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        {candelete ? (
          <Button sx={{ color: "#1b1b00" }} onClick={handleDeleteBtnClick}>
            <DeleteRoundedIcon />
          </Button>
        ) : (
          ""
        )}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button sx={{ color: "#2196f3" }}>
            <LocalPhoneRoundedIcon />
          </Button>
          {isLoggedIn ? (
            <Button sx={{ color: "#e91616" }} onClick={handleLikeBtnClick}>
              <FavoriteRoundedIcon />
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  // onEdit: PropTypes.func,
  candelete: PropTypes.bool,
  clickOnCard: PropTypes.func,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "default subtitle",
  canEdit: false,
};

export default CardComponent;
