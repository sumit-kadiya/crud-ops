import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Pagination,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../ReusableComponents/SearchBar";
import BUTTON from "../ReusableComponents/Button";

const List = () => {
  const [state, setState] = useState([]);
  let [page, setPage] = useState(1);
  let [count, setCount] = useState(1);

  const [query, setQuery] = useState("");

  useEffect(() => {
    let perPage = 3;
    fetch(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`)
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        setState(userData.data);
        console.log(userData.data);
        setCount(Math.ceil(userData.total / perPage));
      });
  }, [page]);

  const handleChange = (e, p) => {
    setPage(p);
  };

  const filteredData = state.filter((el) => {
    if (query === "") {
      return el;
    } else if (el.first_name.toLowerCase().includes(query)) {
      return el;
    } else {
      return el.last_name.toLowerCase().includes(query);
    }
  });

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
              {filteredData.map((item) => (
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
        <Pagination
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={handleChange}
          sx={{ margin: "10px auto" }}
        />
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
