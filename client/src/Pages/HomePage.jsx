import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/Card/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  //second useEffect evry time we make change on search
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      // console.log("filterFunc - (!originalCardsArr && !data)");
      return;
    }

    let filter = "";
    if (qparams.filter) {
      // console.log("qparams.filter = " + qparams.filter);
      filter = qparams.filter;
    }

    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleLikesFromInitialCardsArr = async (id) => {
    try {
      await axios.patch("/cards/card-like/" + id, {
        country: "israel",
        city: "arraba",
        street: "batouf",
        houseNumber: "4a",
        email: "a@b.com",
      }); // /cards/:id
    } catch (err) {
      console.log("error when liking card", err.response.data);
    }
  };
  const handleOnClick = (id) => {
    console.log("on handleOnClick");
    navigate(`${ROUTES.CARDSPECIFICATION}/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        Collection of all cards
      </Typography>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              clickOnCard={handleOnClick}
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onLike={handleLikesFromInitialCardsArr}
              // onEdit={handleEditFromInitialCardsArr}
              candelete={payload && payload.isAdmin}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/*
  <CardComponent
              id={item.id}
              title={item.title}
              price={item.price}
              ----
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
            />
  component 1:
    <CardComponent
              id={1}
              ----
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
            />
  component 2:
    <CardComponent
              id={2}
              ----
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
            />
*/

export default HomePage;
