import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/Auth";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
