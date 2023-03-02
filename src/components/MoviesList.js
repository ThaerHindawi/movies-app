import React from "react";

import MovieCard from "./MovieCard";

const MoviesList = (props) => {
  return (
    <>
      {props.movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
          genre_ids={movie.genre_ids}
        />
      ))}
    </>
  );
};

export default MoviesList;
