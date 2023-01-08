import {  configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import storage from "redux-persist/lib/storage";
import workout from "./workout/workout";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   menu: MenuReducer,
//   cart: cartToolkit,
//   sidebar: sidebarToolkit,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    workout: workout,
  },
  middleware: middlewares,
});

export default store;

// export const persistor = persistStore(store);
