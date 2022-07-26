import React, { useState } from "react";
import { Pagination } from "@mui/material";
import PropTypes from "prop-types";

const PAGINATOR = ({ count, jump }) => {
  let [page, setPage] = useState(1);

  const handleChange = (e, p) => {
    setPage(p);
    jump(p);
  };
  return (
    <Pagination
      count={count}
      page={page}
      variant="outlined"
      shape="rounded"
      color="primary"
      onChange={handleChange}
      sx={{ margin: "10px auto" }}
    />
  );
};

PAGINATOR.propTypes = {
  count: PropTypes.number,
  jump: PropTypes.func,
};

PAGINATOR.defaultProps = {
  count: 1,
  jump: () => {},
};

export default PAGINATOR;
