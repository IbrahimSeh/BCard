import { Box, Grid, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink } from "react-router-dom";

import ROUTES from "../routes/ROUTES";

const MyCardsPage = () => {
  return (
    <Box>
      <Typography variant="h5" color="initial">
        My Cards Page
      </Typography>
      <NavLink activeclassname="is-active" to={ROUTES.CREATECARD}>
        <AddCircleIcon
          sx={{
            color: "blue",
            borderRadius: "50%",
            "&:hover": { color: "#9453a6" },
            fontSize: "80px",
            bottom: 3,
            right: 3,
          }}
        />
      </NavLink>
      <Grid container justify="flex-end" alignItems="flex-end">
        <IconButton style={{ bottom: 3, right: 3 }}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Box>
  );
};
export default MyCardsPage;
