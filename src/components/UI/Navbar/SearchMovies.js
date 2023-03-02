import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesList from "../../MoviesList";
import Pagination from "../../Pagination";
export default function SearchMovies() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("q"));
  const query = searchParams.get("q");
  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    pageNumber <= 0 ? 1 : pageNumber
  );
  console.log("currentPage: " + currentPage);
  const SEARCH_API = (query, pageNumber = 1) =>
    `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${query}&page=${pageNumber}`;
  const [totalPages, setTotalPages] = useState(1);
  // see useCallBack hook to learn more because may the state change
  useEffect(() => {
    fetchMoviesHandler();
  }, [query, pageNumber]);

  async function fetchMoviesHandler() {
    console.log(query);
    setCurrentPage(pageNumber);
    const res = await fetch(SEARCH_API(query, pageNumber));
    const data = await res.json();
    const transformedMovies = data.results.map((movie) => {
      const { id, title, poster_path, vote_average, genre_ids } = movie;
      return { id, title, poster_path, vote_average, genre_ids };
    });
    setMovies(transformedMovies);
    setTotalPages(parseInt(data.total_pages));
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  function pagePath(pageNum) {
    return `?q=${query}&page=${pageNum}`;
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
