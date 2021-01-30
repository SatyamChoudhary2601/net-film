import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import SliderContext from "./context";
import ShowDetailsButton from "./ShowDetailsButton";
import Mark from "./Mark";
import "./Item.scss";
import Helper from "../../Helper/helper";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Content from "./Content";
const DATE_OPTIONS = {
  year: "numeric",
  month: "short",
};
const customStyles = {
  content: {
    top: "50%",
    left: "auto",
    right: "auto",
    bottom: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
  overlay: {
    zIndex: 9999,
  },
};

class Item extends Helper {
  state = {
    loadingFirst: true,
    videoDetailsFirst: null,
    redirect: false,
    redirectPPV: false,
    redirectPaymentOption: false,
    playButtonClicked: false,
    isOpen: false,
  };

  componentDidMount() {
    this.setState({ playButtonClicked: false });
  }

  handlePlayVideo = async (event) => {
    event.preventDefault();

    const inputData = {
      admin_video_id: this.props.movie.admin_video_id,
      skip: 0,
    };

    await this.onlySingleVideoFirst(inputData);

    this.redirectStatus(this.state.videoDetailsFirst);
    this.setState({ playButtonClicked: true });
  };
  openModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  closeHandler = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { movie } = this.props;

    if (this.state.playButtonClicked) {
      const returnToVideo = this.renderRedirectPage(
        this.state.videoDetailsFirst
      );

      if (returnToVideo != null) {
        return returnToVideo;
      }
    }
    // console.log(movie,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // {movie.title === "New Releases" ? }

    return (
      <SliderContext.Consumer>
        {({ onSelectSlide, currentSlide, elementRef }) => {
          const isActive =
            currentSlide &&
            currentSlide.admin_video_id === movie.admin_video_id;

          return (
            <div
              ref={elementRef}
              className={cx("item sliderthumb-text", {
                "item--open": isActive,
              })}
              style={{
                backgroundImage: "url(" + movie.default_image + ")",
              }}
            >
              <a
                onClick={() => onSelectSlide(movie)}
                className="close-overlay"
              />
              <div className="width-100 slider-content-box">
                <Link to="#" onClick={this.handlePlayVideo}>
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
                {/* <button className="btn btn-success" onClick={() => onSelectSlide(movie)} onOpen={this.openModal} onClose={this.onClose}>
                  Trigger
                </button>
                <Modal
                  open={isActive}
                  onClose={this.closeHandler}
                  style={customStyles}
                > */}
                  {/* <p>
                    hellohellohellohellohellohellohellohellohellohellohellohelloh
                    ellohellohellohellohellohellohellohellohellohellohellohellohellohello
                  </p>
                  <p>hello</p>
                  <p>hello</p>
                  <p>hello</p>
                  <p>hello</p>
                  <p>hello</p>
                  <p>hello</p>
                  <p>hello</p>
                  {onSelectSlide ? <Content /> : null} */}
                {/* </Modal> */}
                <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
              </div>
              {isActive && <Mark />}
            </div>
          );
        }}
      </SliderContext.Consumer>
    );
  }
}

export default Item;
