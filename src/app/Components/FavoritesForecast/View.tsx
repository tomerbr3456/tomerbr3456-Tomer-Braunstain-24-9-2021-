import Bar from "../Header/TopBar";
import Grid from "@mui/material/Grid";
import FavoriteCityForecast from "./FavoriteCityForecast";
import { useEffect, useState } from "react";
import { useFavoritesIds } from "../../reducers/favorites";
import { getWeather } from "../../api/accuweather";
import { parseCurrentWeather } from "../../api/parsers";
import { ICurrentWeather } from "../../types/CurrentWeather";

const useFavoriteCitiesWeather = () => {
  const favoritesIds = useFavoritesIds();

  const defaultFavorites: ICurrentWeather[] = [];
  const [favoriteCitiesWeather, setFavoriteCitiesWeather] =
    useState(defaultFavorites);

  useEffect(() => {
    async function getFavoritesWeather() {
      return await Promise.all(
        favoritesIds.map(async (id: string) => {
          const weather = await getWeather(id);
          return parseCurrentWeather(id, weather);
        })
      );
    }

    favoritesIds.length && getFavoritesWeather().then(setFavoriteCitiesWeather);
  }, [favoritesIds]);

  return favoriteCitiesWeather;
};

function View(props: any) {
  const favorites = useFavoriteCitiesWeather();

  return (
    <div>
      <Bar />
      <Grid
        container
        spacing={8}
        style={{
          margin: "70px 30px 0 0",
          width: "100%",
        }}
      >
        {favorites.map((favorite) => (
          <FavoriteCityForecast
            key={favorite.id}
            id={favorite.id}
            cityName={favorite.cityName}
            name={favorite.dayName}
            temperature={favorite.temperature}
            description={favorite.description}
          />
        ))}
      </Grid>
    </div>
  );
}
export default View;
