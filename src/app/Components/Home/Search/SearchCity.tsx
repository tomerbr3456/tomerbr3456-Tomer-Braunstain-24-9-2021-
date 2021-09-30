import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { getCities, searchCitiesByGeoLocation } from "../../../api/accuweather";
import Autocomplete, {
  AutocompleteInputChangeReason,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchedCity } from "../../../reducers/searchedCity";
import { ICity } from "../../../types/City";
import { setErrorMessage } from "../../../reducers/errors";
import { getCurrentPosition } from "../../../api/geolocation";

const convertAccuweatherLocationResultToCity = (location: any) => {
  return {
    id: location.Key,
    name: location.LocalizedName,
    country: location.Country.LocalizedName,
  };
};

function SearchCity({ cityFromUrl }: { cityFromUrl: ICity | null }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const options: ICity[] = [];
  const [autoCompleteOptions, setAutoCompleteOptions] = useState(options);
  const dispatch = useDispatch();

  useEffect(() => {
    async function populateDefaultCityOptions() {
      try {
        const position = await getCurrentPosition();
        const locationOfCurrentPosition = await searchCitiesByGeoLocation(
          position
        );
        const city = convertAccuweatherLocationResultToCity(
          locationOfCurrentPosition
        );

        dispatch(setSearchedCity(city));
        setSearchedCityName(city.name);
      } catch (error: any) {
        dispatch(
          setErrorMessage(
            `We are having some issues getting your current location :(`
          )
        );
        console.error(error.message);
      }
    }
    if (cityFromUrl) {
      dispatch(setSearchedCity(cityFromUrl));
      setSearchedCityName(cityFromUrl.name);
    } else {
      populateDefaultCityOptions();
    }
  }, [cityFromUrl, dispatch]);

  const [searchedCityName, setSearchedCityName] = useState("Tel Aviv");

  const getAutoCompleteOptions = async (cityName: string) => {
    try {
      const cities = await getCities(cityName);
      const autoCompleteOptions: ICity[] = cities.map(
        convertAccuweatherLocationResultToCity
      );

      return autoCompleteOptions;
    } catch (error: any) {
      dispatch(setErrorMessage(`It looks like something went wrong :(`));
      console.error(error.message);
      throw error;
    }
  };

  const handleSearchCity = (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason
  ) => {
    dispatch(setSearchedCity(value));
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    cityName: any,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason !== "reset" || event?.type === "click") {
      getAutoCompleteOptions(cityName).then(setAutoCompleteOptions);
      setSearchedCityName(cityName);
    }
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Autocomplete
        inputValue={searchedCityName}
        options={autoCompleteOptions}
        onChange={handleSearchCity}
        sx={{ width: small ? 500 : 250 }}
        isOptionEqualToValue={(option: ICity, value: any) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option) => option.name}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ marginTop: 120, width: small ? 500 : 250 }}
            variant={"filled"}
            label="Search City"
          />
        )}
      />
    </div>
  );
}
export default SearchCity;
