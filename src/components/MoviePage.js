import React, { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import MovieImages from "./UI/MovieComponent/MovieImages";
import "./MoviePage.css";
import MovieSummary from "./UI/MovieComponent/MovieSummary";
import MovieDetails from "./UI/MovieComponent/MovieDetails";

function MoviePage(props) {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    poster_path: "",
    vote_average: "",
    genres: [],
    backdrop_path: "",
    budget: 0,
    release_date: "",
    overview: "",
    images: {},
    videos: {},
    imdb_id: "",
    vote_count: "",
  });

  const [isloaded, setIsloaded] = useState(false);

  const match = useMatch("moviepage/:id");
  const MovieID = match.params.id;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    async function fetchMoviesHandler() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${MovieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&append_to_response=images,videos`
      );
      const data = await res.json();
      const {
        id,
        title,
        poster_path,
        vote_average,
        genres,
        backdrop_path,
        budget,
        release_date,
        overview,
        images,
        videos,
        imdb_id,
        vote_count,
      } = data;

      // console.log(images.backdrops[0].file_path);

      setMovie(
        {
          id,
          title,
          poster_path,
          vote_average,
          genres,
          backdrop_path,
          budget,
          release_date,
          overview,
          images,
          videos,
          imdb_id,
          vote_count,
        },
        () => {
          setIsloaded(true);
        }
      );
    }

    fetchMoviesHandler();
  }, []);

  return (
    <main id="main">
      <MovieDetails
        MovieID={MovieID}
        IMG_PATH={IMG_PATH}
        title={movie.title}
        poster_path={movie.poster_path}
        vote_average={movie.vote_average}
        genres={movie.genres}
        backdrop_path={movie.backdrop_path}
        budget={movie.budget}
        release_date={movie.release_date}
        imdb_id={movie.imdb_id}
        vote_count={movie.vote_count}
      />

      <MovieImages
        IMG_PATH={IMG_PATH}
        images={movie.images}
        videos={movie.videos}
      />

      <MovieSummary
        MovieID={MovieID}
        IMG_PATH={IMG_PATH}
        overview={movie.overview}
      />
    </main>
  );
}

export default MoviePage;
