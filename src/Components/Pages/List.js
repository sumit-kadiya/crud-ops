import React, { useState } from "react";
import Proptypes from "prop-types";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../ReusableComponents/SearchBar";
import usePagination from "../../Hooks/usePagination";
import PAGINATOR from "../ReusableComponents/Paginator";
import BUTTON from "../ReusableComponents/Button";

const List = ({ data }) => {
  const [query, setQuery] = useState("");

  const filteredData = data.filter((el) => {
    if (query === "") {
      return el;
    } else if (el.first_name.toLowerCase().includes(query)) {
      return el;
    } else {
      return el.last_name.toLowerCase().includes(query);
    }
  });

  const { jump, currentData, count } = usePagination(filteredData);

  return (
    <Box sx={{ margin: "20px auto", width: "40vw" }}>
      <TableContainer
        component={Paper}
        sx={{ margin: "20px auto", width: "40vw" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SearchBar setQuery={setQuery} />
          <Link to="/adduser" style={{ textDecoration: "none" }}>
            <BUTTON variant="outlined" sx={{ margin: "20px" }}>
              Add User
            </BUTTON>
          </Link>
        </Box>
        <Table sx={{ width: "40vw" }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#146eff" }}>
              <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: 20, fontWeight: "bold" }} />
            </TableRow>
          </TableHead>
          {
            <TableBody sx={{ border: 0 }}>
              {currentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: 18 }}>{item.id}</TableCell>
                  <TableCell sx={{ fontSize: 18 }}>
                    {item.first_name} {item.last_name}
                  </TableCell>
                  <TableCell>
                    <Link to={`${item.id}`} style={{ textDecoration: "none" }}>
                      <BUTTON variant="outlined">View</BUTTON>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PAGINATOR jump={jump} count={count} />
      </Box>
    </Box>
  );
};

List.proptypes = {
  data: Proptypes.array,
};

List.defaultProps = {
  data: [],
};
export default List;
