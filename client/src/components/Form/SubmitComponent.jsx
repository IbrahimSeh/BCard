import { Button } from "@mui/material";
import { Fragment } from "react";

const SubmitComponent = ({ onClick }) => {
  const handleBtnSubmitClick = (ev) => {
    onClick(ev);
  };
  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: "#673ab7" }}
        onClick={handleBtnSubmitClick}
      >
        SUBMIT
      </Button>
    </Fragment>
  );
};
export default SubmitComponent;
