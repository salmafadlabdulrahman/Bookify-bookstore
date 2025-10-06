import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Navbar = () => {
  const { user, logout, cart } = useContext(DataContext);
  return (
    <Box
      component={"div"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingTop={"2em"}
      paddingX={"3em"}
      bgcolor={"#8ecae6"}
      paddingBottom={"3em"}
    >

      <Typography
        component={"p"}
        textTransform={"uppercase"}
        fontWeight={"700"}
        letterSpacing={"-1px"}
      >
        Bookify
      </Typography>

      <Box component={"nav"} display={"flex"} gap={"2em"}>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          color="black"
          fontWeight={"500"}
          sx={{
            "&:hover": {
              color: "#fb8500",
              cursor: "pointer",
            },
          }}
        >
          Home
        </Link>
        <Link
          component={RouterLink}
          to="/shop"
          underline="none"
          color="black"
          fontWeight={"500"}
          sx={{
            "&:hover": {
              color: "#fb8500",
              cursor: "pointer",
            },
          }}
        >
          Shop
        </Link>
        <Link
          component={RouterLink}
          to="/about-us"
          underline="none"
          color="black"
          fontWeight={"500"}
          sx={{
            "&:hover": {
              color: "#fb8500",
              cursor: "pointer",
            },
          }}
        >
          About Us
        </Link>
      </Box>

      <Box component={"section"} display={"flex"} gap={"1em"}>
        <LogoutIcon
          sx={{
            "&:hover": {
              color: "#ffb703",
              cursor: "pointer",
            },
          }}
          onClick={logout}
        />

        {user.role === "admin" || user.role === "owner" ? (
          <Link
            component={RouterLink}
            to="/dashboard"
            underline="none"
            color="black"
          >
            <FolderSharedIcon
              sx={{
                "&:hover": {
                  color: "#ffb703",
                  cursor: "pointer",
                },
              }}
            />
          </Link>
        ) : (
          ""
        )}

        {user.role === "user" && (
          <Link
            component={RouterLink}
            to="/cart"
            underline="none"
            color="black"
          >
            <p className="cart-amount">{cart.length}</p>
            <ShoppingCartIcon
              sx={{
                "&:hover": {
                  color: "#ffb703",
                  cursor: "pointer",
                },
              }}
            />
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
