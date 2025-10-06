import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const EditUserForm = () => {
  return (
    <Box component={"section"} textAlign={"center"} marginTop={"2em"}>
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Edit User
      </Typography>

      <form style={{ width: "60%", margin: "0 auto", marginTop: "1.2em" }}>
        <Stack spacing={2}>
          <TextField label="Name" name="name" required></TextField>
          <TextField label="Email" name="email" required></TextField>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="is Admin"
            />
          </FormGroup>

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
            Update User
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditUserForm;
