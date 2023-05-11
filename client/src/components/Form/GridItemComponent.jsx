import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const GridItemComponent = ({ inputKey, inputValue, handelinput }) => {
  const handleInputChange = (ev) => {
    handelinput(ev);
  };

  return (
    <TextField
      autoComplete={"given-" + inputKey}
      name={inputKey}
      required
      fullWidth
      id={inputKey}
      label={inputKey}
      autoFocus
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

GridItemComponent.propTypes = {
  inputKey: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  handelinput: PropTypes.func,
};

export default GridItemComponent;
