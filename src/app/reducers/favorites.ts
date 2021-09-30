import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface FavoritesState {
  favoritesIds: string[];
}

const initialState: FavoritesState = {
  favoritesIds: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favoritesIds = addItem(state.favoritesIds, action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      state.favoritesIds = toggleArrayItem(state.favoritesIds, action.payload);
    },
  },
});

const toggleArrayItem = (arr: string[], item: string) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
const addItem = (arr: string[], item: string) => [...arr, item];

export const { toggleFavorite } = favoritesSlice.actions;
export const { addFavorite } = favoritesSlice.actions;

const isSearchedCityInFavorites = (state: RootState) =>
  state.favorites.favoritesIds.includes(
    state.searchedCity.searchedCity?.id || ""
  );

export const useIsSearchedCityInFavorites = () =>
  useSelector(isSearchedCityInFavorites);

export const useFavoritesIds = () =>
  useSelector((state: RootState) => state.favorites.favoritesIds);

export default favoritesSlice.reducer;
