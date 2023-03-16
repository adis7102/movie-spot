import React, { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";

import { useSelector, useDispatch } from "react-redux";

import MovieListComponent from "../components/MovieList";

import { BASE_URL, API_KEY } from "../constants";
import { MovieList, InitialState, MovieListItem } from "../types";
import { wrapper } from "../store";
import {
  setMovieList,
  setTotalPage,
  getPopularData,
} from "../store/slices/popular";

type Props = {};

const Popular: NextPage<Props> = () => {
  const dispatch = useDispatch();
  const popularStateData: InitialState = useSelector(getPopularData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const resMovieList = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
          currentPage + 1
        }`,
        { method: "GET" }
      );
      const movieListData: MovieList = await resMovieList.json();
  
      const resultsList: MovieListItem[] = [
        ...popularStateData.movieList,
        ...movieListData?.results,
      ];
  
      dispatch(setMovieList(resultsList));
      setCurrentPage(currentPage + 1);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <Head>
        <title>Movie Spot! | Popular Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MovieListComponent
          loading={loading}
          loadMore={() =>
            popularStateData?.totalPage > 1 ? handleLoadMore() : null
          }
          movieList={popularStateData?.movieList}
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
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
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
