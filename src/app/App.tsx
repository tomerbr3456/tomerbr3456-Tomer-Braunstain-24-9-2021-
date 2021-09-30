import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Box from "@mui/material/Box";
import View from "./Components/FavoritesForecast/View";
import { createTheme, ThemeProvider } from "@mui/material";
import { useThemePaletteMode } from "./reducers/userConfigurations";
import CentralizedErrorDialog from "./Components/Notifications/CentralizedErrorDialog";

function App() {
  const mode = useThemePaletteMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Box
            style={{
              minHeight: "100vh",
              width: "100vw",
              backgroundImage:
                theme.palette.mode === "light"
                  ? " linear-gradient(#69a9bf, #a3d4dd, #f8fcfd)"
                  : "linear-gradient(#141e30, #243b55)",
              backgroundColor: "#046f94",
            }}
          >
            <CentralizedErrorDialog />
            <Route path="/" exact component={HomePage} />
            <Route path="/Home/:city" exact component={HomePage} />
            <Route path="/Favorites" exact component={View} />
          </Box>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
