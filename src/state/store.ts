import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersTable/usersTableSlice";

export const store = configureStore({
  reducer: {
    usersTable: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
