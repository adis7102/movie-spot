import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BASE_URL, API_KEY } from "../constants";
import { MovieList, MovieListItem, InitialState } from "../types";


const Home: NextPage = (props) => {

  return (
    <div>
      <Head>
        <title>Movie Spot!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="home">
        <Row className="home-title-container">
          <h1>Hi! Welcome to Movie Spot!</h1>
          <p>Choose one of these category to find movies by clicking on the card!</p>
        </Row>

        {/* tomorrow */}
        {/* create home page, split movie list to it's own component, and create search */}

      </Container>
    </div>
  );
};

export default Home;
