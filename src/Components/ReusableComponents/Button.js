import React from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";

const BUTTON = ({ children, type, sx, onClick, variant, color }) => (
  <Button type={type} variant={variant} sx={sx} onClick={onClick} color={color}>
    {children}
  </Button>
);

BUTTON.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
};

BUTTON.defaultProps = {
  variant: "contained",
  color: "primary",
};

export default BUTTON;
