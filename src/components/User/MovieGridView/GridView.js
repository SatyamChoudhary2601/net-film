import React, { useState } from "react";
import "./GridView.css";
import { Link } from "react-router-dom";
import cx from "classnames";
import Mark from "../../SliderView/MainSlider/Mark";
const GridView = ({ movie, key }) => {
  const [playButtonClicked, setPlayButtonClicked] = useState(false);
  const [videoDetailsFirst, setVideoDetailsFirst] = useState(null);
  // loadingFirst: true,
  // videoDetailsFirst: null,
  // redirect: false,
  // redirectPPV: false,
  // redirectPaymentOption: false,
  // playButtonClicked: false

  const handlePlayVideo = async (event) => {
    event.preventDefault();

    const inputData = {
      admin_video_id: this.props.movie.admin_video_id,
      skip: 0,
    };

    // await onlySingleVideoFirst(inputData);

    // redirectStatus(videoDetailsFirst);
    // setPlayButtonClicked(true);
  };
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
  };
  const isActive = false;
  return (
    <div
      // ref={elementRef}
      className={cx("item sliderthumb-text", {
        "item--open": true,
      })}
      style={{
        backgroundImage: "url(" + movie.default_image + ")",
      }}
    >
      <a
        // onClick={() => onSelectSlide(movie)}
        className="close-overlay"
      />
      <div className="width-100 slider-content-box">
        <Link to="#" onClick={handlePlayVideo}>
          <div className="thumb-playicon">
            <i className="fas fa-play" />
          </div>
        </Link>
        <h4 className="thumb-title">{movie.title}</h4>
        <h5 className="thumb-details">
          <span className="green-clr">
            {new Date(movie.publish_time).toLocaleDateString(
              "en-US",
              DATE_OPTIONS
            )}
          </span>
          <span className="grey-box">
            {movie.age}
            <i className="fas fa-plus small" /> / {movie.watch_count}{" "}
            <span className="small">Views</span>
          </span>
          {/* Not used */}
          {movie.should_display_ppv == 1 ? (
            <span className="red-box">
              {movie.currency} {movie.ppv_amount}
            </span>
          ) : (
            ""
          )}
        </h5>
        <p className="thumb-desc">{movie.description} </p>
        {/* <ShowDetailsButton
                                    onClick={() => onSelectSlide(movie)}
                                /> */}
      </div>
      {isActive && <Mark />}
    </div>
  );
};

export default GridView;
