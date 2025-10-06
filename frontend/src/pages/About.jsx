import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box component={"section"} textAlign={"center"} marginBottom={"3em"}>
      <Typography variant="h4" marginTop={"2em"} fontWeight={"bold"}>
        About Bookify
      </Typography>
      <img src="aboutImg.jpg" width={500} style={{ marginTop: "3em", borderRadius: "15px" }} />
      <Typography
        variant="body2"
        width={"50%"}
        margin={"0 auto"}
        marginTop={"2em"}
        fontSize={"1.2em"}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore quam
        iste excepturi illum temporibus non expedita sunt architecto aliquid,
        eaque nesciunt quod nemo facere repellat aspernatur necessitatibus
        dolores omnis. Perspiciatis accusantium quibusdam sit illum natus
        delectus necessitatibus ducimus? Placeat, ea.
      </Typography>
    </Box>
  );
};

export default About;
