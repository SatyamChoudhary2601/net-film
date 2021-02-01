import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../../Environment";

import Slider from "../SliderView/MainSlider";
import HomePageBanner from "./homePageBanner";
// import ContentLoader from "../Static/contentLoader";
import HomeLoader from "../Loader/HomeLoader";
import GridView from "./MovieGridView/GridView";

import {
  // setTranslations,
  // setDefaultLanguage,
  translate,
} from "react-multi-lang";
// import en from "../translation/en.json";
// import pt from "../translation/pt.json";
import Switch from "react-switch";

class Home extends Component {
  state = {
    maindata: null,
    errorHandle: 0,
    loading: true,
    banner: null,
    checked: false,
  };

  componentDidMount() {
    const inputData = {
      page_type: "HOME",
    };
    api
      .postMethod("home_first_section", inputData)
      // .then((response) => response.json())
      .then((response) => {
        if (response.data.success === true) {
          let maindata = response.data.data;
          let banner = response.data.banner;
          console.log(maindata, "maindata==================");
          this.setState({
            loading: false,
            maindata: maindata,
            banner: banner,
          });
        } else {
          let errorHandle = 1;
          this.setState({ errorHandle });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeHandler = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  renderVideoList = (maindata, index) => {
    return (
      <React.Fragment key={index}>
        <div className="main-slidersec">
          <Link
            to={{
              pathname: "/view-all",
              state: {
                url_type: maindata.url_type,
                url_type_id: maindata.url_type_id,
                page_type: "HOME",
                title: maindata.title,
              },
            }}
          >
            <h3 className="">
              {/* {maindata.title} */}
              {/* All Movies */}
              {/* <i className="fas fa-angle-right ml-2" /> */}
            </h3>
          </Link>

          {/* <div><h4>Enable Portrait</h4>
          <input type="checkbox"/>
          </div> */}
          <Slider>
            {maindata.data.map((movie) => (
              <Slider.Item
                movie={movie}
                key={movie.admin_video_id}
                checked={this.state.checked}
              >
                item1
              </Slider.Item>
            ))}
          </Slider>
          {/* {maindata.data.map((movie) => (
              
               <GridView movie={movie} key={movie.admin_video_id}/> 
             ))} */}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { t } = this.props;

    const { loading, maindata, banner } = this.state;

    console.log(this.state.checked, "this is checked");

    return (
      <div className="main-sec-content">
        {loading ? <HomeLoader /> : <HomePageBanner banner={banner} />}
        <div className="main p-40 home-slider-top">
          {/* {renderMyList} */}
          <div className="checkbox_portrait">
            <label>
              <span
                style={{ position: "absolute", top: "18px", right: "70px" }}
              >
                Portrait Mode
              </span>
              <Switch
                type="checkbox"
                checked={this.state.checked}
                onChange={this.onChangeHandler}
              />
            </label>
          </div>

          {loading
            ? ""
            : maindata.map((mainDa, index) =>
                mainDa.data.length === 0
                  ? ""
                  : loading
                  ? t("loading")
                  : this.renderVideoList(mainDa, index)
              )}

          <div className="height-100" />
        </div>
      </div>
    );
  }
}

export default translate(Home);
