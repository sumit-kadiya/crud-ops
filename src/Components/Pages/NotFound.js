import React from "react";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Card
      sx={{
        width: "40vw",
        height: "240px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px auto",
      }}
    >
      <Typography variant="h4">Sorry! Page Not Found</Typography>
      <Link to="/">Back</Link>
    </Card>
  );
};

export default NotFound;
