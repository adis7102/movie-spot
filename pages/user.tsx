import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";


import MovieListComponent from "../components/MovieList";
import { MovieListItem, MovieListStorageType, UserDataType } from "../types";

const User: NextPage = () => {
  const [account, setAccount] = useState<UserDataType | null>(null);
  const [favouriteMovieList, setFavouriteMovieList] = useState<
    MovieListItem[] | null
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favouriteMovieStorage: MovieListStorageType | null = JSON.parse(
        localStorage.getItem("movieListStorage") || null
      );
      const userData: UserDataType | null = JSON.parse(
        localStorage.getItem("userData") || null
      );

      if (favouriteMovieStorage) {
        setFavouriteMovieList(favouriteMovieStorage?.favouriteMovies);
      }

      if (userData) {
        setAccount(userData);
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Movie Spot! | User Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="user-page">
          <div className="user-page-head">
            <div className="user-page-head-title">HI! {account?.username}</div>
            <div className="user-page-head-subtitle">These are your favourite movies!</div>
          </div>
          <div className="user-page-favourite-list">
            <MovieListComponent movieList={favouriteMovieList} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;
