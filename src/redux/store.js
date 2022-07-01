import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../services/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./users";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);
