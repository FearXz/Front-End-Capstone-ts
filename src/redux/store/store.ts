import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import stateReducer from "../reducers/stateReducer";
import expireReducer from "redux-persist-expire";
import authReducer from "../reducers/authReducer";
import searchRistoranteReducer from "../reducers/searchRistoranteReducer";
import persistedInfoReducer from "../reducers/persistedInfoReducer";
import orderReducer from "../reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "persist"],
  transforms: [
    expireReducer("auth", {
      expireSeconds: 7 * 24 * 60 * 60, // 7 days
      expiredState: { loggedProfile: null },
      autoExpire: true,
    }),
  ],
};

const rootReducer = combineReducers({
  global: stateReducer,
  auth: authReducer,
  searchRistorante: searchRistoranteReducer,
  persist: persistedInfoReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
//export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
