import { Box } from "@mui/material";
import Header from "../components/Header";
import BestSeller from "../components/BestSeller";

const Home = () => {
  return (
    <Box component={"section"}>
      <Header />

      <Box component={"section"} width={"90%"} margin={"0 auto"}>
        <BestSeller />
      </Box>
    </Box>
  );
};

export default Home;
