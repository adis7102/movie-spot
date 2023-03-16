import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Button from "react-bootstrap/Button";

import CommentModal from "../../components/CommentModal";

import {
  MovieListItem,
  MovieListStorageType,
  CommentDataType,
  ListCommentType,
  CommentStorageType,
} from "../../types";

interface Props {
  movieData: MovieListItem;
}

const index: NextPage<Props> = ({ movieData }) => {
  const {
    id,
    backdrop_path,
    title,
    vote_average,
    vote_count,
    release_date,
    overview,
  } = movieData || {};

  const [movieId, setMovieId] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentDataType[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favouriteMovieStorage: MovieListStorageType | null = JSON.parse(
        localStorage.getItem("movieListStorage") || null
      );
      const commentsStorage: CommentStorageType | null = JSON.parse(
        localStorage.getItem("userComments")
      );

      if (favouriteMovieStorage) {
        const findFavourite = favouriteMovieStorage?.favouriteMovies.findIndex(
          (data) => data?.id === id
        );

        setIsFavourite(findFavourite !== -1);
      }

      if (commentsStorage) {
        const findMovieComments = commentsStorage.comments.find(
          (item) => item?.movieId === id
        );

        setComments(findMovieComments?.listComment);
      }
    }
  }, []);

  const handleFavourite = (movieData: MovieListItem) => {
    const cloneMovieList: MovieListStorageType | null = JSON.parse(
      localStorage.getItem("movieListStorage")
    );

    if (cloneMovieList) {
      cloneMovieList.favouriteMovies.push(movieData);

      localStorage.setItem("movieListStorage", JSON.stringify(cloneMovieList));
    } else {
      localStorage.setItem("movieListStorage", JSON.stringify({
        favouriteMovies: [movieData]
      }));
    }

    setIsFavourite(true)
  };

  return (
    <div className="movie-detail">
      <Head>
        <title>Movie Spot! | {title}</title>
        <meta
          name="description"
          content="One spot of all your favourite movies!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="movie-detail-wrap">
          <div id="movie-detail-box" className="movie-detail-box">
            <div className="movie-detail-box-top">
              <div className="detail-image">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                  width={500}
                  height={281}
                />
              </div>
              <div className="detail-description">
                <div className="detail-title">
                  <h1>{title}</h1>
                </div>
                <div className="detail-text">
                  <span>RELEASE DATE: </span>
                  {dayjs(release_date).format("DD MMMM YYYY")}
                </div>
                <div className="detail-text">
                  <span>VOTE AVERAGE: </span>
                  {vote_average}
                </div>
                <div className="detail-text">
                  <span>VOTE COUNT: </span>
                  {vote_count}
                </div>
              </div>
            </div>
            <div className="movie-detail-box-bottom">
              <div className="detail-overview">
                <span>OVERVIEW:</span>
                <div className="detail-overview-text">{overview}</div>
              </div>
            </div>
          </div>
          <div className="action-button">
            {isFavourite ? (
              <div className="favourite-text">Favourite</div>
            ) : (
              <Button size="lg" onClick={() => handleFavourite(movieData)}>
                Add to Favourite!
              </Button>
            )}
            <Button size="lg" variant="success" onClick={() => setMovieId(id)}>
              Add a comment!
            </Button>
          </div>
          <div className="comment-list">
            <div className="comment-list-title">Comments:</div>
            {(comments || []).map((comment: CommentDataType, index) => (
              <div className="comment-list-item" key={index}>
                <div className="comment-list-item-sender">
                  FROM: {comment?.senderUsername}
                </div>
                <div className="comment-list-item-comment">
                  {comment?.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
        <CommentModal id={movieId} onClose={() => setMovieId(null)} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resMovieData = await fetch(
    `https://api.themoviedb.org/3/movie/${context?.query?.id}?api_key=01d363b6952903b2f9cb39bc957763d8&language=en-US`
  );
  const movieData: MovieListItem = await resMovieData.json();

  return {
    props: {
      movieData: movieData,
    },
  };
};

export default index;
