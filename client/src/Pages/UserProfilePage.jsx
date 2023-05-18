import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
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
import { toast } from "react-toastify";
import GridItemComponent from "../components/Form/GridItemComponent";
import CRComponent from "../components/Form/CRComponent";
import SubmitComponent from "../components/Form/SubmitComponent";
import CheckboxComponent from "../components/Form/CheckboxComponent";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs";
const UserProfilePage = () => {
  const userId = jwt_decode(localStorage.getItem("token"))._id;

  const [inputstate] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgAlt: "",
    imgUrl: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });

  const [checked, setChecked] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [btnDisable, setbtnDisable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputstate[key] = data[key];
        }
        inputstate.imgUrl = inputstate.imageUrl;
        inputstate.imgAlt = inputstate.imageAlt;
        inputstate.zipCode += "";
        setChecked(inputstate.biz);
        // console.log("inputstate = ", inputstate);

        delete inputstate.isAdmin;
        delete inputstate.biz;
        delete inputstate._id;
        delete inputstate.imageUrl;
        delete inputstate.imageAlt;
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputstate]);

  let hashedPassword;
  // Encryption of the string password
  bcrypt.genSalt(10, function (err, Salt) {
    // The bcrypt is used for encrypting password.
    bcrypt.hash(inputstate.password, Salt, function (err, hash) {
      if (err) {
        return console.log("Cannot encrypt");
      }

      hashedPassword = hash;
      console.log("hash = ", hash);

      bcrypt.compare(
        inputstate.password,
        "$2a$10$2Rt0dSb4vtZLEvwJihg/MuNhjd.CVmQ036XSZe/.C4BrhRcBmgh7i",
        async function (err, isMatch) {
          // Comparing the original password to
          // encrypted password
          if (isMatch) {
            console.log("Encrypted password is: ", inputstate.password);
            console.log("Decrypted password is: ", hashedPassword);
          }

          if (!isMatch) {
            // If password doesn't match the following
            // message will be sent
            console.log(
              hashedPassword + " is not encryption of " + inputstate.password
            );
          }
        }
      );
    });
  });

  console.log(
    "pass DB = $2a$10$2Rt0dSb4vtZLEvwJihg/MuNhjd.CVmQ036XSZe/.C4BrhRcBmgh7i"
  );

  //yosef password in DB
  //$2a$10$2Rt0dSb4vtZLEvwJihg/MuNhjd.CVmQ036XSZe/.C4BrhRcBmgh7i

  let joiResponse;
  const handleBtnSubmitClick = async (ev) => {
    try {
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        console.log("return from joiResponse");
        return;
      }

      await axios.put("/users/userInfo/" + userId, {
        firstName: inputstate.firstName,
        middleName: inputstate.middleName,
        lastName: inputstate.lastName,
        phone: inputstate.phone,
        email: inputstate.email,
        password: hashedPassword,
        imageUrl: inputstate.imgUrl,
        imageAlt: inputstate.imgAlt,
        state: inputstate.state,
        country: inputstate.country,
        city: inputstate.city,
        street: inputstate.street,
        houseNumber: inputstate.houseNumber,
        zipCode: inputstate.zipCode,
        biz: checked,
      });
      toast.success("the user information has been updated");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the user has been not updated");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputstate[key] = value;
    joiResponse = validateRegisterSchema(inputstate);
    if (!joiResponse) {
      setbtnDisable(false);
    }
  };
  const updatecheckBoxState = (value) => {
    setChecked(value);
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
          USER PROFILE EDIT
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputstate).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={Math.random() + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={inputstate[key] + ""}
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

            <CheckboxComponent
              isChecked={checked}
              passCheckBoxFromChildToParent={updatecheckBoxState}
            />
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>
          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
          />
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
export default UserProfilePage;
// #### For User information update

// ```http
//   PUT /api/users/userInfo
// #### For User information update

// ```http
//   PUT /api/users/userInfo/:id
// #### For Information about a user

// ```http
//   GET /api/users/userInfo
