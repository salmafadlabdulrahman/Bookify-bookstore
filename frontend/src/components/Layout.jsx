import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Layout = () => {
  const { user } = useContext(DataContext);
  return (
    <Box>
      {user ? <Navbar /> : ""}

      <Box component={"div"}>
        <Outlet></Outlet>
      </Box>

      {user ? <Footer /> : ""}
    </Box>
  );
};

export default Layout;
