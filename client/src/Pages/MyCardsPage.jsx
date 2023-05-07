import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, useNavigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
import CardComponent from "../components/Card/CardComponent";

const MyCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  //first useEffect when page load
  useEffect(() => {
    axios
      .get("/cards/my-cards")
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
    navigate(`${ROUTES.CARDEDIT}/${id}`); //localhost:3000/edit/123213
    // `${ROUTES.HOME}?filter=${searchInput}`;
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
      <Typography variant="h3" color="blue">
        Collection of my cards
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
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && (payload.biz || payload.isAdmin)}
            />
          </Grid>
        ))}
      </Grid>

      <NavLink className="AddBtn" mt={3} to={ROUTES.CREATECARD}>
        <AddCircleIcon
          sx={{
            color: "blue",
            borderRadius: "50%",
            "&:hover": { color: "#673ab7" },
            fontSize: "80px",
            //            position: fixed;
            // bottom: 0px;
            // right: 0px;
          }}
        />
      </NavLink>

      {/* <Grid container justify="flex-end" alignItems="flex-end">
        <IconButton style={{ bottom: 3, right: 3 }}>
          <AddCircleIcon />
        </IconButton>
      </Grid> */}
    </Box>
  );
};
export default MyCardsPage;
