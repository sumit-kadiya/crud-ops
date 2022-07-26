import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const INPUT = ({
  id,
  name,
  label,
  style,
  type,
  value,
  onChange,
  disabled,
  fullWidth,
  variant,
  placeholder,
}) => (
  <TextField
    margin="normal"
    required
    disabled={disabled}
    id={id}
    fullWidth={fullWidth}
    name={name}
    label={label}
    sx={style}
    type={type}
    variant={variant}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

INPUT.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
};

INPUT.defaultProps = {
  id: "",
  type: "text",
  disabled: false,
  fullWidth: false,
  variant: "standard",
  placeholder: "",
  onChange: () => {},
};

export default INPUT;
