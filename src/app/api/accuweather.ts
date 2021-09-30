// import {
//   autoCompTelAvi,
//   getWeatheRR,
//   r5daysRamatGan,
//   searchByGeoRamatGan,
// } from "./responses";
// const key = "jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3 ";
// const key = "AfK9DJsh5TSJ2ACh0WVJFuYbbCo8TzB9";
const key = "keIkcwQuwHMsCqZJawOVskNUec3ErVQq";
// const key = "3uRqfH2fd1wfp8GQPytS5sCcSC8cXmBa"; // our token
const baseApiUrl = "https://dataservice.accuweather.com";

export const getCities = async (name: string) => {
  const url = `${baseApiUrl}/locations/v1/cities/autocomplete`;
  const queryString = `?apikey=${key}&q=${name}`;
  const result = await fetch(url + queryString);
  const cities = await result.json();
  return cities;
};

export const getWeather = async (id: string) => {
  const url = `${baseApiUrl}/currentconditions/v1/`;
  const queryString = `${id}?apikey=${key}`;

  const res = await fetch(url + queryString);
  const json = await res.json();
  return json[0];
};

export const get5DaysForecast = async (id: string) => {
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}`;
  const queryString = `?apikey=${key}`;
  const res = await fetch(url + queryString);
  const json = await res.json();
  return json;
};

export const geIconUrl = (iconNumber: number) => {
  const formattedNumber =
    String(iconNumber).length > 1 ? iconNumber : "0" + iconNumber;
  return `https://developer.accuweather.com/sites/default/files/${formattedNumber}-s.png`;
};

export const searchCitiesByGeoLocation = async (geoLocation: {
  lat: number;
  lng: number;
}) => {
  const url = `${baseApiUrl}/locations/v1/cities/geoposition/search`;
  const queryString = `?apikey=${key}&q=${geoLocation.lat},${geoLocation.lng}`;
  const res = await fetch(url + queryString);
  const json = await res.json();
  return json;
};
