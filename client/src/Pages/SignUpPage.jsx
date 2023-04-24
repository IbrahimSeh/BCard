import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateRegisterSchema from "../validation/signupValidation";
import ROUTES from "../routes/ROUTES";

const SignUpPage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBussiness: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      await axios.post("/users/register", {
        name: inputState.firstName + " " + inputState.lastName,
        email: inputState.email,
        password: inputState.password,
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleInputChange = (ev) => {
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
        <Avatar sx={{ m: 1, bgcolor: "#945a61" }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          REGISTER
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={inputState.firstName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.firstName && (
                <Alert severity="warning">
                  {inputsErrorsState.firstName.map((item) => (
                    <div key={"firstName-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="middle-name"
                name="middleName"
                fullWidth
                id="middleName"
                label="Middle Name"
                autoFocus
                value={inputState.middleName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.middleName && (
                <Alert severity="warning">
                  {inputsErrorsState.middleName.map((item) => (
                    <div key={"middleName-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={inputState.lastName}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.lastName && (
                <Alert severity="warning">
                  {inputsErrorsState.lastName.map((item) => (
                    <div key={"lastName-errors" + item}>{item}</div>
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
                    <div key={"phone-errors" + item}>{item}</div>
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
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.password && (
                <Alert severity="warning">
                  {inputsErrorsState.password.map((item) => (
                    <div key={"password-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="image url"
                name="imgUrl"
                fullWidth
                id="imgUrl"
                label="Image url"
                autoFocus
                value={inputState.imgUrl}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imgUrl && (
                <Alert severity="warning">
                  {inputsErrorsState.imgUrl.map((item) => (
                    <div key={"imgUrl-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="image alt"
                name="imgAlt"
                fullWidth
                id="imgAlt"
                label="Image alt"
                autoFocus
                value={inputState.imgAlt}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.imgAlt && (
                <Alert severity="warning">
                  {inputsErrorsState.imgAlt.map((item) => (
                    <div key={"imgAlt-errors" + item}>{item}</div>
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
                    <div key={"state-errors" + item}>{item}</div>
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
                    <div key={"country-errors" + item}>{item}</div>
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
                    <div key={"city-errors" + item}>{item}</div>
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
                    <div key={"street-errors" + item}>{item}</div>
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
              {inputsErrorsState && inputsErrorsState.housenumber && (
                <Alert severity="warning">
                  {inputsErrorsState.housenumber.map((item) => (
                    <div key={"housenumber-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="zip"
                label="zip"
                id="zip"
                autoComplete="zip"
                value={inputState.zip}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.zip && (
                <Alert severity="warning">
                  {inputsErrorsState.zip.map((item) => (
                    <div key={"zip-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBussiness"
                    id="isBussiness"
                    value={inputState.isBussiness}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Signup as bussiness"
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#945a61" }}
            // onClick={handleBtnClick}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUpPage;
