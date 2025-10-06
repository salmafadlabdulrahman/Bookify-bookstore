import { Box, Typography } from "@mui/material";
const Header = () => {
  return (
    <Box
      component={"section"}
      display={"flex"}
      justifyContent={"center"}
      gap={"8em"}
      padding={"2em"}
      paddingBottom={"8em"}
      paddingTop={"8em"}
      bgcolor={"#8ecae6"}
    >
      <Box component={"section"} width={"50%"}>
        <Typography variant="h3" fontWeight={"600"} width={"80%"}>
          Buy and sell your books{" "}
          <Typography variant="span" color="#023e8a">
            for the best prices.
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          marginTop={"2em"}
          fontSize={"1em"}
          color="#495057"
          width={"80%"}
        >
          Find and read more books you'll love, and keep track of the books you
          want to read. Be part of the world's largest community of book lovers
          on Goodreads.
        </Typography>
      </Box>
      <Box component={"section"}>
        <img src="headerImg.jpg" alt="an illustration of books." />
      </Box>
    </Box>
  );
};

export default Header;
