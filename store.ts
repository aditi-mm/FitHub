import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./slices/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

export const wrapper = createWrapper(makeStore);

type ConfiguredStore = ReturnType<typeof makeStore>;
type StoreGetState = ConfiguredStore["getState"];
export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore["dispatch"];
