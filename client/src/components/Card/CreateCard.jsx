import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";
import validateCardSchema from "../../validation/CreateCardValidation";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridItemComponent";

const CreateCard = () => {
  let inputstateFromGridItem = {
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
  };

  const [inputsErrorsState, setInputsErrorsState] = useState(null);

  const navigate = useNavigate();

  const handleBtnSubmitClick = async (ev) => {
    try {
      const joiResponse = validateCardSchema(inputstateFromGridItem);
      setInputsErrorsState(joiResponse);
      console.log("InputsErrorsState = ", inputsErrorsState);
      if (joiResponse) {
        console.log("return from joiResponse");
        return;
      }

      await axios.post("/cards/", {
        title: inputstateFromGridItem.title,
        subTitle: inputstateFromGridItem.subTitle,
        description: inputstateFromGridItem.description,
        state: inputstateFromGridItem.state,
        country: inputstateFromGridItem.country,
        city: inputstateFromGridItem.city,
        street: inputstateFromGridItem.street,
        houseNumber: inputstateFromGridItem.houseNumber,
        email: inputstateFromGridItem.email,
        zipCode: inputstateFromGridItem.zipCode,
        phone: inputstateFromGridItem.phone,
        web: inputstateFromGridItem.web,
        url: inputstateFromGridItem.url,
        alt: inputstateFromGridItem.alt,
      });
      toast.success("A new bussiness card has been created");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      toast.error("the card has been not created");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.MYCARDS);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputstateFromGridItem[key] = value;
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
          CREATE CARD
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputstateFromGridItem).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={Math.random() + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  passDataFromChildToParent={updateState}
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

          <SubmitComponent goBtn={handleBtnSubmitClick} />
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCard;
