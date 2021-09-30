import { makeStyles } from "@material-ui/styles";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { get5DaysForecast } from "../../../api/accuweather";
import { parseDailyForecast } from "../../../api/parsers";
import { useSearchedCity } from "../../../reducers/searchedCity";
import { IDaily } from "../../../types/Daily";
import Daily from "./Daily";

const useStyles = makeStyles(() => ({
  daysWrapper: {
    marginLeft: 0,
    height: "95%",
    width: "100%",
  },
}));

const useDailyForecasts = () => {
  const [dailyForecasts, setDailyForecasts] = useState<IDaily[]>([]);
  const searchedCity = useSearchedCity();

  useEffect(() => {
    async function populate5DaysForecast(id: string) {
      const results = await get5DaysForecast(id);
      const dailyForecasts = results.DailyForecasts.map(parseDailyForecast);
      setDailyForecasts(dailyForecasts);
    }
    searchedCity?.id && populate5DaysForecast(searchedCity.id);
  }, [searchedCity]);

  return dailyForecasts;
};

export default function DailyForecastList() {
  const dailyForecasts = useDailyForecasts();
  const classes = useStyles();

  return (
    <Grid container columns={10} spacing={2} className={classes.daysWrapper}>
      {dailyForecasts.map((daily: IDaily) => (
        <Daily
          key={daily.date}
          date={daily.date}
          day={daily.day}
          night={daily.night}
        />
      ))}
    </Grid>
  );
}
