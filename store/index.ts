import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper } from 'next-redux-wrapper';

import popularReducer from './slices/popular';
import topRatedReducer from './slices/topRated';

const makeStore = () => configureStore({
  reducer: {
    popular: popularReducer,
    topRated: topRatedReducer
  },
  devTools: true
})

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)