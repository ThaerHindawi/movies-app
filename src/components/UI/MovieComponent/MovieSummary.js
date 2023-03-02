import React, { useEffect, useState } from "react";
import default_profile_path from "../../../assets/images/default_profile_image.png";

export default function MovieSummary(props) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchCast();
  }, []);

  async function fetchCast() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${props.MovieID}/credits?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
    );
    const data = await res.json();
    setCast(data.cast);
  }
  return (
    <div className="overview-wrapper">
      <div className="actors">
        <div className="overview">
          <h2>overview</h2>
          <p>{props.overview}</p>
        </div>

        <div className="cast">
          <div>
            <h3>Top Cast</h3>
          </div>
          {cast
            .filter((item, index) => index < 5)
            .map((actor) => {
              return (
                <div key={actor.id} className="actor">
                  <img
                    src={
                      actor.profile_path !== null
                        ? props.IMG_PATH + actor.profile_path
                        : default_profile_path
                    }
                    alt={actor.name}
                  />

                  <h4>{actor.name}</h4>
                </div>
              );
            })}

          {/* <div className="actor">
            <img src="./files/Jennifer Lopez.jpg" alt="Jennifer Lopez" />
            <h6>Jennifer Lopez</h6>
          </div>

          <div className="actor">
            <img src="./files/Jennifer Coolidge.jpg" alt="Jennifer Coolidge" />
            <h6>Jennifer Coolidgedsssssssssssddddddds</h6>
          </div>

          <div className="actor">
            <img src="./files/Josh Duhamel.jpg" alt="Josh Duhamel" />
            <h6>Jennifer Lopez</h6>
          </div>

          <div className="actor">
            <img src="./files/Lenny Kravitz.jpg" alt="Lenny Kravitz" />
            <h6>Lenny Kravitz</h6>
          </div> */}
        </div>
      </div>
    </div>
  );
}
