import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { WrapperSliderStyle } from "./style";
const SliderComponent = ({ arrimage }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 3s
    arrows: false,
  };
  return (
    <div>
      <WrapperSliderStyle {...settings}>
        {arrimage.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} style={imgStyle} />
            </div>
          );
        })}
      </WrapperSliderStyle>
    </div>
  );
};
const imgStyle = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
};

export default SliderComponent;
