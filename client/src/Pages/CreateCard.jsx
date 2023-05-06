import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import validateCardSchema from "../validation/CreateCardValidation";
import axios from "axios";

const CreateCard = () => {
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

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateCardSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        console.log("return in joi");
        return;
      }
      console.log("after joi");
      await axios.post("/cards/", {
        title: inputState.title,
        subTitle: inputState.subTitle,
        description: inputState.description,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zipCode,
        phone: inputState.phone,
        email: inputState.email,
        web: inputState.web,
        url: inputState.url,
        alt: inputState.alt,
      });
      console.log("after axios");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      //   console.log("error from axios", err.response.data);
      console.log('error from create card post("/cards/)');
    }
  };
  const handleInputChange = (ev) => {
    console.log("on handleInputChange");
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-title"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={inputState.title}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.title && (
                <Alert severity="warning">
                  {inputsErrorsState.title.map((item) => (
                    <div key={"title-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="subTitle"
                name="subTitle"
                required
                fullWidth
                id="subTitle"
                label="SubTitle"
                autoFocus
                value={inputState.subTitle}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.subTitle && (
                <Alert severity="warning">
                  {inputsErrorsState.subTitle.map((item) => (
                    <div key={"subTitle-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={inputState.description}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.description && (
                <Alert severity="warning">
                  {inputsErrorsState.description.map((item) => (
                    <div key={"description-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.phone && (
                <Alert severity="warning">
                  {inputsErrorsState.phone.map((item) => (
                    <div key={"phone-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
                <Alert severity="warning">
                  {inputsErrorsState.email.map((item) => (
                    <div key={"email-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="web"
                label="Web"
                type="web"
                id="web"
                autoComplete="web"
                value={inputState.web}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.web && (
                <Alert severity="warning">
                  {inputsErrorsState.web.map((item) => (
                    <div key={"web-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="url"
                name="url"
                fullWidth
                id="url"
                label="Image url"
                autoFocus
                value={inputState.url}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.url && (
                <Alert severity="warning">
                  {inputsErrorsState.url.map((item) => (
                    <div key={"url-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="alt"
                name="alt"
                fullWidth
                id="alt"
                label="Image alt"
                autoFocus
                value={inputState.alt}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.alt && (
                <Alert severity="warning">
                  {inputsErrorsState.alt.map((item) => (
                    <div key={"alt-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="state"
                name="state"
                fullWidth
                id="state"
                label="State"
                autoFocus
                value={inputState.state}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.state && (
                <Alert severity="warning">
                  {inputsErrorsState.state.map((item) => (
                    <div key={"state-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                autoComplete="country"
                value={inputState.country}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.country && (
                <Alert severity="warning">
                  {inputsErrorsState.country.map((item) => (
                    <div key={"country-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                autoComplete="citycity"
                value={inputState.city}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.city && (
                <Alert severity="warning">
                  {inputsErrorsState.city.map((item) => (
                    <div key={"city-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="street"
                label="Street"
                id="street"
                autoComplete="street"
                value={inputState.street}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.street && (
                <Alert severity="warning">
                  {inputsErrorsState.street.map((item) => (
                    <div key={"street-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="House number"
                label="House number"
                id="houseNumber"
                autoComplete="house number"
                value={inputState.houseNumber}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.houseNumber && (
                <Alert severity="warning">
                  {inputsErrorsState.houseNumber.map((item) => (
                    <div key={"housenumber-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="zipCode"
                label="Zip Code"
                id="zipCode"
                autoComplete="zipCode"
                value={inputState.zipCode}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.zipCode && (
                <Alert severity="warning">
                  {inputsErrorsState.zipCode.map((item) => (
                    <div key={"zipCode-errors" + item}>
                      {item.includes("pattern:")
                        ? item.split("pattern:")[0] + "pattern"
                        : item}
                    </div>
                  ))}
                </Alert>
              )}
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#945a61" }}
            onClick={handleBtnClick}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCard;