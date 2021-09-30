import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import rootReducer from "./reducers";

import storage from "redux-persist/lib/storage";

import { persistStore, persistReducer } from "redux-persist";

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["searchedCity"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export let store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
export let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
