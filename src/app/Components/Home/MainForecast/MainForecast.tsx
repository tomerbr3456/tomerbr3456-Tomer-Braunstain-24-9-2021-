import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";
import { getWeather } from "../../../api/accuweather";
import { makeStyles } from "@material-ui/styles";
import { useSearchedCity } from "../../../reducers/searchedCity";
import { Typography } from "@mui/material";
import { parseCurrentWeather } from "../../../api/parsers";
import TemperatureComponent from "../../../Shared/TemperatureComponent";
import { Box } from "@mui/system";
import { ICurrentWeather } from "../../../types/CurrentWeather";
import DailyForecastList from "./DailyForecastList";
import FavoriteSelection from "./FavoriteSelection";

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginTop: 70,
    display: "flex",
    justifyContent: "center",
  },
  "@media (max-width: 600px)": {
    marginTop: 0,
  },
  card: {
    cursor: "pointer",
    position: "relative",
    minHeight: 450,
    backgroundImage: (theme: any) =>
      theme.palette.mode === "light"
        ? "linear-gradient(#046f94,#3493ad)"
        : "linear-gradient(#2C5364, #203A43, #0F2027)",
    borderRadius: 8,
  },
  content: {
    display: "flex",
    width: "100%",
    height: "30%",
    fontSize: "1.25em",
    fontWeight: 700,
    color: "#fff",
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    "@media (max-width: 600px)": {
      height: "20%",
    },
  },
  cityName: {
    marginTop: 15,
  },
  description: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 700,
    marginBottom: 40,
    "@media (max-width: 600px)": {
      fontSize: "2.5em",
    },
  },
}));

export default function Period() {
  const theme = useTheme();

  const [currentConditions, setCurrentConditions] =
    useState<ICurrentWeather | null>(null);

  const searchedCity = useSearchedCity();
  const classes = useStyles(theme);

  useEffect(() => {
    async function getCurrentConditionsOfCity(id: string) {
      const weather = await getWeather(id);
      const currentWeatherConditions = parseCurrentWeather(id, weather);

      setCurrentConditions(currentWeatherConditions);
    }

    searchedCity?.id && getCurrentConditionsOfCity(searchedCity.id);
  }, [searchedCity]);

  return (
    <Box className={classes.root}>
      <Container fixed>
        <div className={classes.card}>
          <div className={classes.content}>
            <Typography className={classes.cityName} variant={"h5"}>
              {searchedCity?.name}
            </Typography>
            <Typography variant={"h4"}>
              <TemperatureComponent
                temperature={currentConditions?.temperature || 0}
              />
            </Typography>
          </div>
          <Typography variant={"h2"} className={classes.description}>
            {currentConditions?.description}
          </Typography>
          <FavoriteSelection />
          <DailyForecastList />
        </div>
      </Container>
    </Box>
  );
}
