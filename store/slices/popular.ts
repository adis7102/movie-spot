import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';

export const PopularSlice = createSlice({
  name: 'popular',

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
      state.movieList = action.payload.popular.movieList
      state.totalPage = action.payload.popular.totalPage
    }
  }
});

export const { setMovieList, setTotalPage } = PopularSlice.actions;

export const getPopularData = (state: AppState) => state.popular;

export default PopularSlice.reducer;