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
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateRegisterSchema from "../validation/signupValidation";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import GridItemComponent from "../components/Form/GridItemComponent";
import CRComponent from "../components/Form/CRComponent";
import SubmitComponent from "../components/Form/SubmitComponent";

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
  });

  // const inputSatateKeys = Object.keys(inputState);

  const [resetInputState, setresetInputState] = useState({
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
  });

  const [checked, setChecked] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);

  const navigate = useNavigate();

  const handleBtnSubmitClick = async (ev) => {
    console.log("inputState = ", inputState);

    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      await axios.post("/users/register", {
        firstName: inputState.firstName,
        middleName: inputState.middleName,
        lastName: inputState.lastName,
        phone: inputState.phone,
        email: inputState.email,
        password: inputState.password,
        imageUrl: inputState.imageUrl,
        imageAlt: inputState.imageAlt,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zip,
        biz: checked,
      });
      toast.success("A new user has been created");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the user has been not created");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleBtnResetClick = () => {
    // window.location.reload();
    setInputState(resetInputState);
    setChecked(false);
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
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
            {Object.entries(inputState).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={Math.random() + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={value}
                  handelinput={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.key && (
                  <Alert severity="warning">
                    {inputsErrorsState.key.map((item) => (
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

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBussiness"
                    id="isBussiness"
                    checked={checked}
                    onChange={handleCheckBoxChange}
                    inputProps={{ "aria-label": "controlled" }}
                    color="primary"
                  />
                }
                label="Signup as bussiness"
              />
            </Grid>
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent goBtn={handleBtnSubmitClick} />

          {/* <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#673ab7" }}
            submitBtn={handleBtnSubmitClick}
          >
            SUBMIT
          </Button> */}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="http://localhost:3000/login"
                variant="body2"
                underline="hover"
              >
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
