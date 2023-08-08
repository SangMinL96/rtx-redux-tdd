import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { todoSlice } from "./reducer/todoReducer";
import { requestSlice } from "./reducer/requestReducer";
import { requestAPI } from "@/modules/request/query";

export const makeStore = () =>
  configureStore({
    reducer: {
      [todoSlice.name]: todoSlice.reducer,
      [requestSlice.name]: requestSlice.reducer,
      [requestAPI.reducerPath]: requestAPI.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(requestAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
const dispatchType = makeStore().dispatch;
export type AppDispatch = typeof dispatchType;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
