import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ICity } from "../types/City";

interface SearchResults {
  searchedCity: ICity | null
}

const initialState: SearchResults = {
  searchedCity: null,
};

export const locationSlice = createSlice({
  name: "searchedCity",
  initialState,
  reducers: {
    setSearchedCity: (state, action: PayloadAction<ICity>) => {
      state.searchedCity = action.payload
    },
  },
});

export const { setSearchedCity } = locationSlice.actions;

export const getSearchedCity = (state: RootState) => state.searchedCity.searchedCity;

export const useSearchedCity = () => useSelector(getSearchedCity);

export default locationSlice.reducer;
