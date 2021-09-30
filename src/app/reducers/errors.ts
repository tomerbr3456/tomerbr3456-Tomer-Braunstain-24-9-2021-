import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ErrorsState {
  errorMessage: string;
}

const initialState: ErrorsState = {
  errorMessage: "",
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = errorsSlice.actions;

export const useErrorMessage = () =>
  useSelector((state: RootState) => state.errorsReducer.errorMessage);

export default errorsSlice.reducer;
