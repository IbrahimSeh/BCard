import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";
import validateCardSchema from "../../validation/CreateCardValidation";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridItemComponent";
import useQueryParams from "../../hooks/useQueryParams";

const CardEdit = () => {
  console.log("CardEditt");
  let qparams = useQueryParams();
  const [value, setValue] = useState(0); // integer state

  const [inputState, setInputState] = useState({
    title: "",
    subTitle: "",
    description: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
  });

  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();

  // /cards/card/:id
  useEffect(() => {
    console.log("useeffect");
    axios
      .get("/cards/card/" + qparams.cardId)
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputState[key] = data[key];
        }
        inputState.url = inputState.image.url;
        inputState.alt = inputState.image.alt;
        delete inputState._id;
        delete inputState.image;
        delete inputState.createdAt;
        delete inputState.likes;
        delete inputState.bizNumber;
        delete inputState.__v;
        delete inputState.user_id;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputState, qparams.cardId]);

  // (async () => {
  //   console.log("hbfrj");
  //   try {
  //     const { data } = await axios.get("/cards/card/" + qparams.cardId);
  //     for (const key in JSON.parse(JSON.stringify(data))) {
  //       inputState[key] = data[key];
  //     }
  //     inputState.url = inputState.image.url;
  //     inputState.alt = inputState.image.alt;
  //     delete inputState._id;
  //     delete inputState.image;
  //     delete inputState.createdAt;
  //     delete inputState.likes;
  //     delete inputState.bizNumber;
  //     delete inputState.__v;
  //     delete inputState.user_id;
  //   } catch (err) {
  //     console.log("err from axios", err);
  //     toast.error("Oops");
  //   }
  // })();

  const handleBtnSubmitClick = async (ev) => {
    try {
      const joiResponse = validateCardSchema(inputState);
      setInputsErrorsState(joiResponse);

      if (joiResponse) {
        console.log("return from joiResponse");
        return;
      }
      await axios.put("/cards/" + qparams.cardId, {
        title: inputState.title,
        subTitle: inputState.subTitle,
        description: inputState.description,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        email: inputState.email,
        zipCode: inputState.zipCode,
        phone: inputState.phone,
        web: inputState.web,
        url: inputState.url,
        alt: inputState.alt,
      });

      toast.success("the card has been edited");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the card has been not edited");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.MYCARDS);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Initial timeout!");
      inputState.zipCode += "";
      setValue(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const updateState = (key, value) => {
    inputState[key] = value;
    console.log("inputState = ", inputState);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          CARD UPDATE
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputState).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={Math.random() + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={inputState[key]}
                  onChange={updateState}
                />
                {inputsErrorsState && inputsErrorsState[key] && (
                  <Alert severity="warning">
                    {inputsErrorsState[key].map((item) => (
                      <div key={`${key}-errors` + item}>
                        {item.includes("pattern:")
                          ? item.split("pattern:")[0] + "pattern"
                          : item}
                      </div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent onClick={handleBtnSubmitClick} />
        </Box>
      </Box>
    </Container>
  );
};
export default CardEdit;
