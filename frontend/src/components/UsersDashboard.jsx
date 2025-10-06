import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";

const UsersDashboard = ({ users }) => {
  return (
    <Box component={"section"} padding={"1em"}>
      <Typography variant="h4" fontWeight={"bold"} marginBottom={"1em"}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1250 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell width={"200"} sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell width={"250"} sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Admin
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <CheckIcon sx={{ cursor: "pointer" }} />
                  ) : (
                    <ClearIcon sx={{ cursor: "pointer" }} />
                  )}
                </TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersDashboard;
