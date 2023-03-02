import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import logoImdb from "../../../assets/images/logo-imdb.svg";
import rtCertified from "../../../assets/images/rt-certified-fresh.png";
import defaultImage from "../../../assets/images/default_profile_image.png";

function MovieDetails(props) {
  const [Keywords, setKeywords] = useState([]);
  const detailsContainer = useRef(null);

  useEffect(() => {
    fetchKeywords();
  }, []);

  async function fetchKeywords() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${props.MovieID}/keywords?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
    );
    const data = await res.json();
    setKeywords(data.keywords);
  }

  function movieGenres() {
    let names = "";
    props.genres.forEach((genre, index) => {
      if (index !== props.genres.length - 1) names += genre.name + ", ";
      else names += genre.name;
    });
    return names;
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${props.IMG_PATH +
            props.backdrop_path})`,
      }}
      ref={detailsContainer}
      className="details-container"
    >
      <div className="mobile-movie-title">
        <h1>{props.title}</h1>
        <h2>2023</h2>
        <h2>{movieGenres()}</h2>
      </div>
      <div className="row">
        <div className="movie-poster">
          <img src={props.poster_path !== null ? props.IMG_PATH + props.poster_path: defaultImage} alt={props.title} />
          <a className="basic-btn" href="#">
            watch now
          </a>
          <a className="basic-btn download-btn" href="#">
            <span>
              <i className="fa-solid fa-download"></i>
            </span>
            download
          </a>
        </div>
        <div className="movie-details">
          <div className="main-movie-info">
            <div className="movie-title">
              <h1>{props.title}</h1>
              <h2>{props.release_date}</h2>
              <h2>{movieGenres()}</h2>
            </div>
          </div>

          <div className="movie-quality">
            <em>Available in:</em>
            <a href="#">720p</a>
            <a href="#">1080p</a>
            <a href="#">2160p</a>
          </div>

          <div className="rating">
            <span className="icon-rating">
              <FontAwesomeIcon className="heart" icon={Icons.faHeart} />
            </span>
            <span className="movie-likes">{props.vote_count}</span>
          </div>

          <div className="rating">
            <a
              className="icon-rating"
              href={"https://www.imdb.com/title/" + props.imdb_id}
              target="_blank"
            >
              <img src={logoImdb} alt="IMDb Rating" />
            </a>
            <span className="movie-likes">
              {parseFloat(props.vote_average).toFixed(1)}
            </span>
          </div>

          <div className="rating">
            <a
              className="icon-rating"
              href={"https://www.imdb.com/title/" + props.imdb_id}
              target="_blank"
            >
              <img src={rtCertified} alt="IMDb Rating" />
            </a>
            <span className="movie-likes">
              {parseFloat(props.vote_average).toFixed(1)}
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
          </div>

          <div className="keywords">
            <em>keywords:</em>
            {Keywords && Keywords.map((keyword) => (
              <a  key= {keyword.id} className="keyword" href={`/keyword/${keyword.id}`}>
                {keyword.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
