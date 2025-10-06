import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    navigate("/cart/checkout");
  };

  return (
    <Box
      component={"section"}
      textAlign={"center"}
      width={"60%"}
      margin={"0 auto"}
      marginTop={"5em"}
    >
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Shipping
      </Typography>

      <form style={{ width: "60%", margin: "0 auto", marginTop: "1.2em" }}>
        <Stack spacing={2}>
          <TextField
            label="Address"
            name="address"
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="City"
            name="city"
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Postal Code"
            name="postalCode"
            onChange={handleChange} 
            required
          ></TextField>
          <TextField label="Country" name="country" onChange={handleChange}  required></TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#10002b",
              padding: ".5em",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ShippingForm;
