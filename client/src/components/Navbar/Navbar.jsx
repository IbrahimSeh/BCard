import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  IconButton,
  Typography,
  Container,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

import SwithMode from "./SwithMode";
import SearchNavBar from "./SearchNavBar";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../redux/Auth";

import logo from "../../assets/images/BCardLogo2.png";

// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Signup",
    url: ROUTES.SIGNUP,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "LogOut",
    url: ROUTES.LOGOUT,
  },
];

//admin/biz pages
// const adminBizPages = [
//   {
//     label: "Create",
//     url: ROUTES.REGISTER,
//   },
// ];

const Navbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const navbarstyle = {
    backgroundColor: "#0f0d35",
  };

  return (
    <AppBar style={navbarstyle} position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <NavLink activeclassname="is-active" to="/Home">
            <Avatar alt="Logo" src={logo} />
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter((page) => page.label !== "Home")
              .map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
          </Box>

          <SearchNavBar />

          <Box sx={{ my: 2, p: 1 }}>
            {/* <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography> */}
            {/* <IconButton>
              <Typography sx={{ display: { xs: "none", md: "inline" } }}>
                {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
              </Typography>
            </IconButton> */}
            <SwithMode />
            {/* <Switch checked={isDarkTheme} onChange={changeTheme} /> */}
          </Box>

          {/* signin/notSignin navbar */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>

          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.concat(notAuthPages).map((page) => (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLink to={page.url}>
                    {/* if the current page and the link is the same then it will change the color of the link */}
                    {({ isActive }) => (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: `${isActive ? "red" : ""}`,
                        }}
                      >
                        {page.label}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
