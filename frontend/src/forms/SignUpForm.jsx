import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

const SignUpForm = () => {
  const { signUp } = useContext(DataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        signUp(data)
        navigate("/");
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };


  return (
    <Box component={"section"}>
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Sign Up
      </Typography>

      <form
        style={{ width: "60%", margin: "0 auto", marginTop: "3em" }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={5}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          ></TextField>

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          ></TextField>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#c8b6ff",
              padding: ".5em",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Button>

          <p style={{ fontWeight: "500" }}>
            Already have an account ?{" "}
            <Link component={RouterLink} to={"/signin"}>
              Sign In
            </Link>
          </p>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUpForm;
