import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/Card/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  console.log("in home page");
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  console.log("payload = " + JSON.stringify(payload));

  useEffect(() => {
    console.log("in useEffect homepage");
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        // console.log("data", data);
        // setCardsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  useEffect(() => {
    console.log("in second useeffect");
    filterFunc();
  }, [qparams.filter]);

  // console.log("originalCardsArr = " + JSON.stringify(originalCardsArr));

  const filterFunc = (data) => {
    console.log("in filterFunc");

    if (!originalCardsArr && !data) {
      console.log("filterFunc - (!originalCardsArr && !data)");
      return;
    }

    let filter = "";
    // console.log("qparams.filter = " + qparams.filter);
    if (qparams.filter) {
      console.log("qparams.filter = " + qparams.filter);
      filter = qparams.filter;
    }

    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      console.log("when component loaded and states not loaded");
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      console.log("cardsArr = " + cardsArr);
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      console.log("when all loaded and states loaded");
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    // let newCardsArr = JSON.parse(JSON.stringify(cardsArr));
    // newCardsArr = newCardsArr.filter((item) => item.id != id);
    // setCardsArr(newCardsArr);
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && (payload.biz || payload.isAdmin)}
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
