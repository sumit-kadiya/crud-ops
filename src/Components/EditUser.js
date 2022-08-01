import React, { useState } from "react";
import { Card, Box, Alert } from "@mui/material";
import INPUT from "./ReusableComponents/Input";
import BUTTON from "./ReusableComponents/Button";
import PropTypes from "prop-types";

const EditUser = ({ user, setOpen }) => {
  const { id, first_name, last_name, email } = user;
  const [data, setData] = useState({
    fname: first_name,
    lname: last_name,
    email: email,
  });
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

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
        setError({
          status: true,
          msg: "User Updated Successfully",
          type: "success",
        });
        fetch(`https://reqres.in/api/users/${id}`, {
          method: "PUT",
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
          setOpen(false);
        }, 1000);
      } else {
        setError({
          status: true,
          msg: "Please Enter Valid Email",
          type: "error",
        });
        setTimeout(() => {
          setError({ status: false });
        }, 1000);
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
      setTimeout(() => {
        setError({ status: false });
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
        {error.status && (
          <Alert variant="filled" severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        )}
        <INPUT
          label="ID"
          variant="outlined"
          fullWidth
          name="id"
          value={id}
          margin="normal"
          disabled
        />
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
              setOpen(false);
            }}
          >
            Cancel
          </BUTTON>
        </Box>
      </Box>
    </Card>
  );
};

EditUser.propTypes = {
  user: PropTypes.object,
  setOpen: PropTypes.func,
};

EditUser.defaultProps = {
  user: {},
  setOpen: () => {},
};

export default EditUser;
