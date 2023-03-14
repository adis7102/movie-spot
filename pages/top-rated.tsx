import React, { Fragment, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import clsx from "clsx";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";

import { BASE_URL, API_KEY } from "../constants";
import { MovieList, MovieListItem, InitialState } from "../types";

import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

import { wrapper } from "../store";
import {
  setMovieList,
  setTotalPage,
  getTopRatedData,
} from "../store/slices/topRated";

type Props = {
  movieListData: MovieListItem[];
};

// const ModalDownload = dynamic(() => import("../components/ModalDownload"));

const Popular: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  const topRatedStateData: InitialState = useSelector(getTopRatedData);

  const [currentPage, setCurrentPage] = useState(5);

  const handleLoadMore = async (page: number) => {
    const resMovieList = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${
        page + 1
      }&with_watch_monetization_types=flatrate`,
      { method: "GET" }
    );
    const movieListData: MovieList = await resMovieList.json();

    const resultsList: object[] = [
      ...topRatedStateData.movieList,
      ...movieListData?.results,
    ];

    dispatch(setMovieList(resultsList));
    setCurrentPage(page + 1);
  };

  console.log(topRatedStateData, 'ini nih')

  return (
    <div>
      <Head>
        <title>Movie Spot!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ScrollToTop />
      <div className="movie-list">
        <Row>
          {(topRatedStateData?.movieList || []).map(
            (item: MovieListItem, index) => (
              <Col key={index} xs={8} md={4} lg={3} xxl={2}>
                <Link href={`/${item?.id}`} prefetch={false}>
                  <div className="movie-item">
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
                        src={`https://image.tmdb.org/t/p/w300${item?.poster_path}`}
                        width={400}
                        height={570}
                      />
                    </div>
                    <div className="movie-item-description">
                      <div className="movie-title">{item?.title}</div>
                      <div className="movie-info">
                        <span>Release date:</span>{" "}
                        {dayjs(item?.release_date).format("DD MMM YYYY")}
                      </div>
                      <div className="movie-info">
                        <span>Popularity:</span> {item?.popularity}
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            )
          )}
        </Row>
        {/* <div className="movie-list-wrap">
          {(topRatedStateData?.movieList || []).map(
            (item: MovieListItem, index) => (
              <Fragment key={index}>
                <Link href={`/${item?.id}`} prefetch={false}>
                  <div className="movie-item">
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
                        src={`https://image.tmdb.org/t/p/w300${item?.poster_path}`}
                        width={270}
                        height={370}
                      />
                    </div>
                    <div className="movie-item-description">
                      <div className="movie-title">{item?.title}</div>
                      <div className="movie-info">
                        <span>Release date:</span>{" "}
                        {dayjs(item?.release_date).format("DD MMM YYYY")}
                      </div>
                      <div className="movie-info">
                        <span>Popularity:</span> {item?.popularity}
                      </div>
                    </div>
                  </div>
                </Link>
                {index + 1 === (topRatedStateData?.movieList || []).length && (
                  <Button size="lg" onClick={() => handleLoadMore(currentPage)}>
                    Load More!
                  </Button>
                )}
              </Fragment>
            )
          )}
        </div> */}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    let urls = [];

    for (let i: number = 1; i <= 5; i++) {
      urls.push(
        `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${i}&with_watch_monetization_types=flatrate`
      );
    }

    const resMovieList: MovieList[] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, { method: "GET" });
        return res.json();
      })
    );

    const mappedListData: object[] = resMovieList.flatMap(
      (item) => item.results
    );

    console.log(mappedListData)

    store.dispatch(setMovieList(mappedListData));
    store.dispatch(setTotalPage(resMovieList?.[4]?.total_pages || 0));

    return {
      props: {
        movieListData: mappedListData,
      },
    };
  });

export default Popular;
