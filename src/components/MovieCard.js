import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import * as IconsRegular from "@fortawesome/free-regular-svg-icons";
import { Outlet, Link } from "react-router-dom";
import defaultImage from "../assets/images/default_profile_image.png";
import "./MovieCard.css";

// https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee

function MovieCard(props) {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const genres = new Map([
    [28, "Action"],
    [12, "Adventure"],
    [16, "Animation"],
    [35, "Comedy"],
    [80, "Crime"],
    [99, "Documentary"],
    [18, "Drama"],
    [10751, "Family"],
    [14, "Fantasy"],
    [36, "History"],
    [27, "Horror"],
    [10402, "Music"],
    [9648, "Mystery"],
    [10749, "Romance"],
    [878, "Science Fiction"],
    [10770, "TV Movie"],
    [53, "Thriller"],
    [10752, "War"],
    [37, "Western"],
  ]);

  return (
    <div id={props.id} className="movie">
      <Link to={`/moviepage/${props.id}`}>
        <img src={props.poster_path !== null ? IMG_PATH + props.poster_path : defaultImage} alt={props.title} />
        <div className="movie-info">
          <h3>{props.title}</h3>

          <div className="genres">
            {props.genre_ids.map((genreId) => (
              <span key={genreId}>{genres.get(genreId)}</span>
            ))}
          </div>
        </div>
        <span className="quality">1080p WEB-DL</span>
        <span className="rate-star">
          <FontAwesomeIcon icon={Icons.faStar} /> {props.vote_average}
        </span>
        <div className="play-btn">
          <FontAwesomeIcon icon={IconsRegular.faCirclePlay} />
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
