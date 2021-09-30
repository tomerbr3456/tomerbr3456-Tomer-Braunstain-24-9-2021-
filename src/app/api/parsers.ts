import moment from "moment";
import { ICurrentWeather } from "../types/CurrentWeather";
import { geIconUrl } from "./accuweather";

export function parseCurrentWeather(id: string, weather: any) {
  return {
    id,
    cityName: weather.Link.split("/")[5]
      .replace("-", " ")
      .toUpperCase(),
    dayName: moment(weather.LocalObservationDateTime).format("dddd"),
    isDayTime: weather.IsDayTime,
    temperature: weather.Temperature.Imperial.Value,
    icon: geIconUrl(weather.WeatherIcon),
    description: weather.WeatherText,
  } as ICurrentWeather
}

export function parseDailyForecast(daily: any) {
  return {
    date: daily.Date,
    day: {
      temperature: daily.Temperature.Maximum.Value,
      icon: geIconUrl(daily.Day.Icon),
    },
    night: {
      temperature: daily.Temperature.Minimum.Value,
      icon: geIconUrl(daily.Night.Icon),
    },
  };
}