import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";

const OrdersDashboard = () => {
  function createData(id, name, date, total, paid, delivered) {
    return { id, name, date, total, paid, delivered };
  }

  const rows = [
    createData(
      1,
      "Salma Fadl",
      "2024-9-19",
      "$21.38",
      <CheckIcon sx={{ cursor: "pointer" }} />,
      <CheckIcon sx={{ cursor: "pointer" }} />
    ),
    createData(
      2,
      "Tony Stark",
      "2024-9-19",
      "$21.38",
      <CheckIcon sx={{ cursor: "pointer" }} />,
      <CheckIcon sx={{ cursor: "pointer" }} />
    ),
    createData(
      3,
      "Natasha Romanoff",
      "2024-9-19",
      "$21.38",
      <CheckIcon sx={{ cursor: "pointer" }} />,
      <CheckIcon sx={{ cursor: "pointer" }} />
    ),
    createData(
      4,
      "Steve Rogers",
      "2024-9-19",
      "$21.38",
      <CheckIcon sx={{ cursor: "pointer" }} />,
      <CheckIcon sx={{ cursor: "pointer" }} />
    ),
  ];
  return (
    <Box component={"section"} padding={"1em"}>
      <Typography variant="h4" fontWeight={"bold"} marginBottom={"1em"}>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1250 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell width={"200"} sx={{ fontWeight: "bold" }}>
                User
              </TableCell>
              <TableCell width={"250"} sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Paid
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Delivered
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.paid}</TableCell>
                <TableCell>{row.delivered}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersDashboard;
