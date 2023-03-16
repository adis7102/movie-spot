import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import MovieListComponent from "../components/MovieList";

import { BASE_URL, API_KEY } from "../constants";
import { MovieList, MovieListItem } from "../types";

const Home: NextPage = () => {
  const [searchInput, setsearchInput] = useState<string | null>(null);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPaginate, setLoadingPaginate] = useState<boolean>(false);
  const [movieListData, setMovieListData] = useState<MovieListItem[] | null>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchInput && searchRef.current.value === searchInput) {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(
            searchInput
          )}&language=en-US&include_adult=false&include_video=false&page=1`,
          { method: "GET" }
        );
        const resSearch: MovieList = await res.json();
        
        if(resSearch.results.length) {
          setMovieListData(resSearch.results);
          setTotalPage(resSearch?.total_pages);
        } else {
          setMovieListData(null);
          setTotalPage(1);
        }

        setLoading(false);
      } else {
        setMovieListData([]);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, searchRef]);
  
  const handleLoadMore = async () => {
    try {
      setLoadingPaginate(true)
      const cloneMovieList = JSON.parse(JSON.stringify(movieListData));
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(
          searchInput
        )}&language=en-US&include_adult=false&include_video=false&page=${currentPage + 1}`,
        { method: "GET" }
      );
      const resSearchPaginate: MovieList = await res.json();
  
      const resultsList: MovieListItem[] = [
        ...cloneMovieList,
        ...resSearchPaginate?.results
      ];
      
      setMovieListData(resultsList);
      setTotalPage(resSearchPaginate?.total_pages);
      setCurrentPage(currentPage + 1);
      setLoadingPaginate(false);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Head>
        <title>Movie Spot!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="home-container">
          <div className="home-container-title-container">
            <h1>Hi! Welcome to Movie Spot!</h1>
            <p>
              Choose one of these category to find movies by clicking on the card!
            </p>
          </div>
          <div className="category-card-row">
            <Link href="/popular" passHref>
              <Col className="category-card" md={4}>
                <p>Popular Movies</p>
              </Col>
            </Link>
            <Link href="/top-rated" passHref>
              <Col className="category-card" md={4}>
                <p>Top Rated Movies</p>
              </Col>
            </Link>
          </div>
          <div className="search-container">
            <div className="search-title">Or try to search movies by title</div>
            <InputGroup className="search-input mb-3 mt-3">
              <Form.Control
                placeholder="title"
                aria-label="search"
                name="search"
                ref={searchRef}
                onChange={(event) => setsearchInput(event?.target?.value)}
              />
            </InputGroup>
          </div>
          {loading ? (
            <div className="spinner-wrap">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <>
              {movieListData === null && searchInput ? (
                <div className="not-found">
                  Cannot find movie with title {searchInput}
                </div>
              ) : (
                <MovieListComponent loading={loadingPaginate} loadMore={() => totalPage > 1 ? handleLoadMore() : null} movieList={movieListData} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
