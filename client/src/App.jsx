import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
  Typography,
} from "@mui/material";

/* toast */
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/App.css";
import "./css/BCardFooter.css";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import Router from "./routes/Router";
import BCardFooter from "./components/BCardFooter";
// import MuiNavbar from "./components/Navbar/MuiNavbar";
// import Router from "./routes/Router";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  });

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      <Container>
        <header>
          {/* <MuiNavbar /> */}
          <Typography variant="h1" color="initial">
            the header
          </Typography>
        </header>
        {/* {isLoading ? <CircularProgress /> : <Router />} */}
        <main>
          <Typography variant="h3" color="initial">
            the main
          </Typography>
        </main>
        <footer>
          <Typography variant="h5" color="initial">
            the footer
          </Typography>
          <BCardFooter />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
