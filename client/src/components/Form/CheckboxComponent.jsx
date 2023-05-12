import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Fragment, useState } from "react";

const CheckboxComponent = ({ passCheckBoxFromChildToParent }) => {
  const [checked, setChecked] = useState(false);
  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
    passCheckBoxFromChildToParent(event.target.checked);
  };
  return (
    <Fragment>
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
    </Fragment>
  );
};
export default CheckboxComponent;
