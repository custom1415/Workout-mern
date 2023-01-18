import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import workout from "./workout/workout";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  workout: workout,
});

const middlewares = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export default store;

export const persistor = persistStore(store);

// export const persistor = persistStore(store);
