import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Alert } from "@mui/material";
import INPUT from "../ReusableComponents/Input";
import BUTTON from "../ReusableComponents/Button";
import PropTypes from "prop-types";

const AddUser = ({ userData }) => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const navigate = useNavigate();

  const formHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.fname && data.lname && data.email.includes("@")) {
      setError({
        status: true,
        msg: "User Added Successfully",
        type: "success",
      });
      fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          console.log(data);
          userData.push({
            id: data.id,
            first_name: data.fname,
            last_name: data.lname,
            email: data.email,
            avatar: "https://statinfer.com/wp-content/uploads/dummy-user.png",
          });
        });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
      setTimeout(() => {
        setError({ status: false });
      }, 2000);
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "40vw",
        margin: "20px auto",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "300px",
          paddingX: 2,
        }}
      >
        {error.status && (
          <Alert variant="filled" severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        )}
        <INPUT
          label="First Name"
          variant="outlined"
          fullWidth
          required
          name="fname"
          value={data.fname}
          onChange={formHandler}
          margin="normal"
        />
        <INPUT
          label="Last Name"
          variant="outlined"
          fullWidth
          required
          name="lname"
          value={data.lname}
          onChange={formHandler}
          margin="normal"
        />
        <INPUT
          label="Email"
          variant="outlined"
          fullWidth
          required
          name="email"
          value={data.email}
          onChange={formHandler}
          margin="normal"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginY: 3,
          }}
        >
          <BUTTON type="submit" variant="contained" onClick={submitHandler}>
            Save
          </BUTTON>
          <BUTTON
            variant="contained"
            sx={{
              marginLeft: 2,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </BUTTON>
        </Box>
      </Box>
    </Card>
  );
};

AddUser.propTypes = {
  userData: PropTypes.array,
};

AddUser.defaultProps = {
  userData: [],
};

export default AddUser;
