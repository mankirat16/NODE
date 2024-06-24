import React, { useEffect, useState, useContext } from "react";
import { UpdateContext } from "../../updateContext";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import data from "./data.json";
export default function Users() {
  const { update, setUpdate, id, setId } = useContext(UpdateContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/user/deleteUser", {
        data: { id: id }, // Specify data object with id here
        headers: {
          "Content-Type": "application/json", // Set the correct content type
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getUsers")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleViewUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/user/${user.id}`);
    setId(user.id);
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      marginTop={8}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, padding: 2 }}
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1 }}
              ></Typography>
            </Box>
            {user.profileImage && (
              <Box
                component="img"
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  marginTop: 2,
                }}
              />
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              startIcon={<Visibility />}
              variant="outlined"
              onClick={() => {
                handleViewUser(user);
              }}
            >
              View Profile
            </Button>
            <Button
              startIcon={<Edit />}
              variant="outlined"
              color="primary"
              onClick={() => {
                setUpdate(true);
                setId(user.id);
                navigate("/updateProfile");
              }}
            >
              Edit Profile
            </Button>
            <Button
              startIcon={<Delete />}
              variant="outlined"
              color="error"
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              Delete User
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
