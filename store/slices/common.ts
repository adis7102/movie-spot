import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

export const CommonState = createSlice({
  name: 'common',

  initialState: {
    successAddComment: false,
    message: ''
  },

  reducers: {
    setSuccessAddComment: (state, action) => {
      state.successAddComment = action.payload.isSuccess
      state.message = action.payload.message
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.successAddComment = action.payload.common.successAddComment,
      state.message = action.payload.common.message
    }
  }
});

export const { setSuccessAddComment } = CommonState.actions;

export const getCommonData = (state: AppState) => state.common;

export default CommonState.reducer;