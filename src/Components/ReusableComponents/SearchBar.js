import React from "react";
import INPUT from "./Input";
import PropTypes from "prop-types";

const SearchBar = ({ setQuery }) => {
  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <INPUT
      variant="standard"
      placeholder="Search"
      style={{ margin: "20px" }}
      onChange={handleChange}
    />
  );
};

SearchBar.propTypes = {
  setQuery: PropTypes.func,
};

SearchBar.defaultProps = {
  setQuery: () => {},
};
export default SearchBar;
