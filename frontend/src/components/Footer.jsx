import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component={"footer"}
      bgcolor={"#1b263b"}
      color={"#415a77"}
      marginTop={"12em"}
      padding={"3em"}
      paddingTop={"4em"}
      
      display={"flex"}
      
      justifyContent={"center"}
      
      gap={"10em"}
    >
      <Box component={"section"} sx={{ cursor: "pointer" }}>
        <Typography variant="body1" marginBottom={".5em"}>
          Company
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          About
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Careers
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Blog
        </Typography>
      </Box>
      <Box component={"section"} sx={{ cursor: "pointer" }}>
        <Typography variant="body1" marginBottom={".5em"}>
          Help center
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Discord server
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Facebook
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Contact us
        </Typography>
      </Box>
      <Box component={"section"} sx={{ cursor: "pointer" }}>
        <Typography variant="body1" marginBottom={".5em"}>
          Legal
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Terns & condition
        </Typography>
      </Box>
      <Box component={"section"} sx={{ cursor: "pointer" }}>
        <Typography variant="body1" marginBottom={".5em"}>
          Download
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          ios
        </Typography>
        <Typography variant="body2" marginBottom={".5em"}>
          Android
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
