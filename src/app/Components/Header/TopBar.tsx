import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import TempUnitToggleButtons from "./TempUnitToggleButtons";
import ToggleDarkMode from "./ToggleDarkMode";
import { useMediaQuery } from "@mui/material";

export default function TopBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar style={{ position: "relative" }}>
          {matches && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {"Herolu Weather Task"}
            </Typography>
          )}

          <ToggleDarkMode />
          <TempUnitToggleButtons />
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                position: small ? "unset" : "absolute",
                right: "25%",
                bottom: 27,
                marginLeft: small ? 20 : 0,
              }}
            >
              {small ? "Home Page" : "Home"}
            </Button>
          </Link>
          <Link
            to="/Favorites"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button
              style={{
                position: small ? "unset" : "absolute",
                right: "5%",
                bottom: 27,
                marginLeft: small ? 10 : 0,
              }}
              variant="contained"
            >
              {small ? "Favorites" : "Fave"}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
