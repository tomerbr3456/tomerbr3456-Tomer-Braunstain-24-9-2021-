import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { togglePaletteMode } from "../../reducers/userConfigurations";
import { Box } from "@mui/system";

export default function ToggleDarkMode() {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "15%",
        justifyContent: "center",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => dispatch(togglePaletteMode())}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}
