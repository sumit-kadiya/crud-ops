import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Alert } from "@mui/material";
import INPUT from "../ReusableComponents/Input";
import BUTTON from "../ReusableComponents/Button";

const AddUser = () => {
  const [alert, setAlert] = useState({
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

    if (data.fname && data.lname && data.email) {
      if (
        data.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setAlert({
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
          });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setAlert({
          status: true,
          msg: "Please Enter Valid Email",
          type: "error",
        });
        setTimeout(() => {
          setAlert({ status: false });
        }, 1000);
      }
    } else {
      setAlert({ status: true, msg: "All Fields are Required", type: "error" });
      setTimeout(() => {
        setAlert({ status: false });
      }, 1000);
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
        {alert.status && (
          <Alert variant="filled" severity={alert.type} sx={{ mt: 3 }}>
            {alert.msg}
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

export default AddUser;
