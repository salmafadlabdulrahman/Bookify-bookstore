import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const navigate = useNavigate();

  console.log(paymentMethod)

  const handleSubmit = () => {
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/cart/shipping");
  };
  return (
    <Box
      component={"section"}
      textAlign={"center"}
      width={"60%"}
      margin={"0 auto"}
      marginTop={"5em"}
    >
      <Typography
        id="demo-radio-buttons-group-label"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5em",
          paddingBottom: "3em",
          color: "black",
        }}
      >
        Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        <FormControlLabel
          value="Cash"
          control={<Radio />}
          label="Cash on Delivery"
        />
      </RadioGroup>
      
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ backgroundColor: "black", marginTop: "4em" }}
      >
        Continue
      </Button>
      
    </Box>
  );
};

export default PaymentMethod;