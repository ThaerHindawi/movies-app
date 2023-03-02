import React, { useState, useEffect } from "react";
import MoviesList from "./MoviesList";

import "./Home.css";
import Pagination from "./Pagination";
import { useMatch, useSearchParams } from "react-router-dom";

/**
  const rows = [];
  for (let i = 0; i < 4; i++) {
    const movies = [];
    for (let j = 0; j < 5; j++) {
      movies.push(<MovieCard />);
    }
    rows.push(
      <div className="row" key={i}>
        {movies}
      </div>
    );
  }
 */

function Home() {
  const match = useMatch("page/:number");
  // const matchSortBy = useMatch("sort_by/:sort_by");
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("sort_by"));
  const query = searchParams.get("sort_by");
  console.log("query" + query);
  const sortBy = query || "popularity";
  console.log(sortBy);
  const PageNumber =
    (match && match.params && match.params.number > 500
      ? 500
      : match && match.params && match.params.number) || 1;
  // const SEARCH_API =
  //   'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(PageNumber <= 0 ? 1 : PageNumber)
  );
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = (currPage) => {
    if (sortBy === "popularity") {
      console.log("Home soooo");
      return `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${currPage}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
    } else if (sortBy === "Newest") {
      return `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&page=${currPage}&primary_release_date.lte=${new Date()
        .toJSON()
        .slice(0, 10)}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
    } else if (sortBy === "Best") {
      return `https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${currPage}`;
    }
  };
  // see useCallBack hook to learn more because may the state change
  useEffect(() => {
    fetchMoviesHandler();
  }, [currentPage, sortBy]);

  async function fetchMoviesHandler() {
    const res = await fetch(API_URL(currentPage));
    const data = await res.json();
    const transformedMovies = data.results.map((movie) => {
      const { id, title, poster_path, vote_average, genre_ids } = movie;
      return { id, title, poster_path, vote_average, genre_ids };
    });
    setMovies(transformedMovies);
    const total_pages = parseInt(data.total_pages);
    setTotalPages(total_pages < 500 ? total_pages : 500);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  function pagePath(pageNum) {
    if (sortBy === "popularity") {
      return `/page/${pageNum}`;
    }
    return `/page/${pageNum}?sort_by=${sortBy}`;
  }

  return (
    <main id="main">
      <div className="container">{content}</div>
      <Pagination
        onPageChange={setCurrentPage}
        totalPageCount={totalPages}
        currentPage={currentPage}
        pagePath={pagePath}
      />
    </main>
  );
}

export default Home;
