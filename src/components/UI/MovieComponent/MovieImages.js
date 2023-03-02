import React from "react";
import defaultImage from "../../../assets/images/default_profile_image.png";
export default function MovieImages(props) {
  return (
    <div className="wrapper">
      <div className="media_panel">
        <div className="iframe-container">
          <iframe
            className="responsive-iframe"
            src={`https://www.youtube-nocookie.com/embed/${props.videos.results && props.videos.results[0] && props.videos.results[0].key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <img
            src={props.images.backdrops && props.images.backdrops.length > 1 ?  props.IMG_PATH + props.images.backdrops[0].file_path : defaultImage}
            alt="background-3"
          />

          <img
            src={props.images.backdrops && props.images.backdrops.length > 1 ?  props.IMG_PATH + props.images.backdrops[1].file_path : defaultImage}
            alt="background-4"
          />
      </div>
    </div>
  );
}
