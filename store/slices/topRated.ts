import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

export const TopRatedSlice = createSlice({
  name: 'topRated',

  initialState: {
    movieList: [],
    totalPage: 0
  },

  reducers: {
    setMovieList: (state, action) => {
      state.movieList = action.payload
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.movieList = action.payload.topRated.movieList
      state.totalPage = action.payload.topRated.totalPage
    }
  }
});

export const { setMovieList, setTotalPage } = TopRatedSlice.actions;

export const getTopRatedData = (state: AppState) => state.topRated;

export default TopRatedSlice.reducer;