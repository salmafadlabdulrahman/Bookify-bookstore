import { Button } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  return (
    <div style={{textAlign: "center", marginTop: "5em", paddingBottom: "8em"}}>
      <ErrorOutlineIcon sx={{ fontSize: 50 }} />
      <h2 style={{marginTop: "1em"}}>404 Not Found</h2>
    </div>
  );
};

export default NotFound;
