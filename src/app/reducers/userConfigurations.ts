import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface UserConfigurationsState {
  temperatureUnit: "C" | "F";
  themePaletteMode: PaletteMode;
}

const initialState: UserConfigurationsState = {
  temperatureUnit: "C",
  themePaletteMode: "light",
};

export const userConfigurationsSlice = createSlice({
  name: "userConfigurations",
  initialState,
  reducers: {
    setTempUnit: (state, action: PayloadAction<"C" | "F">) => {
      state.temperatureUnit = action.payload;
    },
    togglePaletteMode: (state) => {
      state.themePaletteMode =
        state.themePaletteMode === "light" ? "dark" : "light";
    },
  },
});

export const { setTempUnit, togglePaletteMode } =
  userConfigurationsSlice.actions;

export const useTemperatureUnit = () =>
  useSelector(
    (state: RootState) => state.userConfigurationsReducer.temperatureUnit
  );

export const useThemePaletteMode = () =>
  useSelector(
    (state: RootState) => state.userConfigurationsReducer.themePaletteMode
  );

export default userConfigurationsSlice.reducer;
