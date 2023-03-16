import React, { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import { useSelector, useDispatch } from "react-redux";

import { BASE_URL, API_KEY } from "../constants";
import { MovieList, MovieListItem, InitialState } from "../types";

import MovieListComponent from "../components/MovieList";

import { wrapper } from "../store";
import {
  setMovieList,
  setTotalPage,
  getTopRatedData,
} from "../store/slices/topRated";

type Props = {};

const Popular: NextPage<Props> = () => {
  const dispatch = useDispatch();
  const topRatedStateData: InitialState = useSelector(getTopRatedData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoadMore = async () => {
    try {
      setLoading(true)
      const resMovieList = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${
          currentPage + 1
        }`,
        { method: "GET" }
      );
      const movieListData: MovieList = await resMovieList.json();
  
      const resultsList: MovieListItem[] = [
        ...topRatedStateData.movieList,
        ...movieListData?.results,
      ];
  
      dispatch(setMovieList(resultsList));
      setCurrentPage(currentPage + 1);
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <Head>
        <title>Movie Spot! | Top Rated Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MovieListComponent
          loading={loading}
          loadMore={() =>
            topRatedStateData?.totalPage > 1 ? handleLoadMore() : null
          }
          movieList={topRatedStateData?.movieList}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    let resMovieList: MovieList = {
      page: "1",
      results: [],
      total_pages: 0,
      total_results: 0,
    };

    try {
      const res = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1`,
        { method: "GET" }
      );
      resMovieList = await res.json();

      store.dispatch(setMovieList(resMovieList?.results));
      store.dispatch(setTotalPage(resMovieList?.total_pages || 0));
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        movieListData: resMovieList,
      },
    };
  });

export default Popular;
