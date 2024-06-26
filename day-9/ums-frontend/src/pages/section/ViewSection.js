import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UpdateContext } from "../../updateContext";
import { Edit, Delete, Visibility } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
export default function ViewSection() {
  const { sectionId } = useContext(UpdateContext);
  const [info, setInfo] = useState([]);
  const [noUser, setNoUser] = useState("");
  useEffect(() => {
    axios
      .put("http://localhost:5000/section/viewSectionUsers", {
        id: sectionId,
      })
      .then((res) => {
        setInfo(res.data.data);
        if (res.data.data.length === 0) setNoUser(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log("View section with section ID " + sectionId);
  return (
    <div style={{ marginTop: 50 }}>
      {noUser && (
        <Alert variant="filled" severity="error" sx={{ marginTop: 2 }}>
          No Students in this Section !
        </Alert>
      )}
      {info.map((user) => (
        <Card
          key={user.id}
          sx={{
            minWidth: 275,
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            marginTop: 3,
          }}
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
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
        </Card>
      ))}
    </div>
  );
}
