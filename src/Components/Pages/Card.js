import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EditUser from "../EditUser";
import BUTTON from "../ReusableComponents/Button";
import PropTypes from "prop-types";

const DisplayCard = ({ data, setState }) => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const { personId } = useParams();
  const navigate = useNavigate();

  const fetchUserHandler = useCallback(() => {
    fetch(`https://reqres.in/api/users/${personId}`)
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        setUser(userData.data);
        // console.log(userData.data);
      });
  }, [personId]);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler]);

  const handleDelete = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setState(data.filter((item) => item.id !== id));

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
        flexDirection: "column",
      }}
    >
      {user ? (
        <Card
          sx={{
            minWidth: "40vw",
            height: "240px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", padding: "10px" }}>
            <Avatar
              alt="Remy Sharp"
              src={user.avatar}
              sx={{ width: 128, height: 128 }}
              variant="rounded"
            />
            <CardContent sx={{ textAlign: "left", marginLeft: 2 }}>
              <Typography gutterBottom variant="h4" component="div">
                {personId}. {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {user.email}
              </Typography>
            </CardContent>
          </Box>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <BUTTON
              variant="contained"
              color="success"
              onClick={() => setOpen(true)}
            >
              Edit
            </BUTTON>
            <BUTTON
              variant="contained"
              color="error"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </BUTTON>
          </CardActions>
        </Card>
      ) : (
        <Card
          sx={{
            minWidth: "40vw",
            height: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">User Not Found</Typography>
        </Card>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 2,
          width: "40vw",
        }}
      >
        <BUTTON onClick={() => navigate("/")} variant="text">
          Back
        </BUTTON>
      </Box>
      {open && <EditUser user={user} setUser={setUser} setOpen={setOpen} />}
    </Box>
  );
};

DisplayCard.propTypes = {
  data: PropTypes.array,
  setState: PropTypes.func,
};

DisplayCard.defaultProps = {
  data: [],
  setState: () => {},
};

export default DisplayCard;
