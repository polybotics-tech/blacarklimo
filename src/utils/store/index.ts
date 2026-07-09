import { combineReducers, configureStore } from "@reduxjs/toolkit";
import WebStorage from "redux-persist/lib/storage";
import bookingSlice from "@/src/utils/store/slice/bookingSlice";
import adminSlice from "@/src/utils/store/slice/adminSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const rootReducer = combineReducers({
  booking: bookingSlice.reducer,
  admin: adminSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: WebStorage,
    whitelist: ["admin", "booking"],
  },
  rootReducer,
);

const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
