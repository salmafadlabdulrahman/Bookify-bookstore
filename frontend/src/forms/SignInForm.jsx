import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const SignInForm = () => {
  const { signIn } = useContext(DataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        signIn(data)
        navigate("/");
      } else {
        alert(data.message || "Sign in failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Box component={"section"}>
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Sign In
      </Typography>

      <form
        style={{ width: "60%", margin: "0 auto", marginTop: "3em" }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={5}>
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
            Sign In
          </Button>

          <p style={{ fontWeight: "500" }}>
            Don't have an account ?{" "}
            <Link component={RouterLink} to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </Stack>
      </form>
    </Box>
  );
};

export default SignInForm;
