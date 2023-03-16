import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import CommentModal from "../CommentModal";

import { MovieListItem, MovieListStorageType, UserDataType } from "../../types";
import { excludeLoadmoreMovieList } from "../../constants";

type Props = {
  movieList: MovieListItem[] | null;
  loadMore?: Function;
  loading?: boolean;
};

const MovieListComponent: React.FC<Props> = ({
  movieList,
  loadMore,
  loading,
}) => {
  const router = useRouter();
  const [movieListStorage, setmovieListStorage] = useState<
    MovieListItem[] | null
  >([]);
  const [userDataState, setUserDataState] = useState<UserDataType | null>(null);
  const [movieId, setmovieId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataStorage: MovieListStorageType | null = JSON.parse(
        localStorage.getItem("movieListStorage") || null
      );
      const userData: UserDataType | null = JSON.parse(
        localStorage.getItem("userData") || null
      );

      if (dataStorage) {
        setmovieListStorage(dataStorage?.favouriteMovies);
      }

      if (userData) {
        setUserDataState(userData);
      }
    }
  }, []);

  const handleAddToFavourite = (movieData: MovieListItem) => {
    const cloneMovieList = JSON.parse(JSON.stringify(movieListStorage));

    cloneMovieList.push(movieData);

    localStorage.setItem(
      "movieListStorage",
      JSON.stringify({
        favouriteMovies: cloneMovieList,
      })
    );
    setmovieListStorage(cloneMovieList);
  };

  return (
    <Container fluid className="movie-list">
      <Row>
        {(movieList || []).map((item: MovieListItem, index) => (
          <Col
            className="movie-list-item-col"
            key={index}
            xs={12}
            md={4}
            lg={4}
            xxl={3}
          >
            <div className="movie-item">
              <Link href={`/${item?.id}`} prefetch={false}>
                <div className="movie-item-wrap">
                  <div className="image-wrap">
                    <div
                      className={clsx("rank-wrap", {
                        "first-pos": index === 0,
                        "second-pos": index === 1,
                        "third-pos": index === 2,
                      })}
                    >
                      <div className="rank-triangle" />
                      <div className="rank-text">{index + 1}</div>
                    </div>
                    <Image
                      alt={`Music SPOT! | ${item?.title}`}
                      src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                      width={500}
                      height={281}
                    />
                  </div>
                  <div className="movie-item-description">
                    <div className="movie-title">{item?.title}</div>
                    <div className="movie-info">
                      <span>Release date:</span>{" "}
                      {dayjs(item?.release_date).format("DD MMM YYYY")}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="movie-action-wrap">
                <div className="movie-action-wrap-button">
                  {(movieListStorage || []).findIndex(
                    (data) => data?.id === item?.id
                  ) === -1 ? (
                    <Button
                      size="sm"
                      onClick={() => handleAddToFavourite(item)}
                    >
                      Add to favourites!
                    </Button>
                  ) : (
                    <p>Favourite</p>
                  )}
                </div>
                <div className="movie-action-wrap-button">
                  {userDataState ? (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => setmovieId(item?.id)}
                    >
                      Add comments!
                    </Button>
                  ) : (
                    <Button size="sm" variant="disabled" disabled>
                      Login to comment!
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {movieList?.length &&
      !excludeLoadmoreMovieList.includes(router.pathname) ? (
        <div className="load-more-button">
          <Button
            disabled={loading}
            size="lg"
            variant="warning"
            onClick={() => loadMore()}
          >
            Load more!
          </Button>
        </div>
      ) : null}
      <CommentModal id={movieId} onClose={() => setmovieId(null)} />
    </Container>
  );
};

export default MovieListComponent;
