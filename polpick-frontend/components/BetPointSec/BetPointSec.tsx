/* eslint-disable react/no-array-index-key */
import { BetPointSecWrapper } from "@/styles/StyledComponents/BetPointSecWrapper";
import SliderLeftArrow from "@/ui/Icons/SliderLeftArrow";
import SliderRightArrow from "@/ui/Icons/SliderRightArrow";
import { Box, BoxProps, Button, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const betNumberList = [5, 10, 15, 20, 25, 50, 100];

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerPadding: "50px",
  centerMode: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 2
      }
    }
    // {
    //   breakpoint: 480,
    //   settings: {
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   }
    // }
  ]
};

const BetPointSec: React.FC<BoxProps> = ({ ...props }) => {
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef?.current?.slickNext();
  };
  const prev = () => {
    sliderRef?.current?.slickPrev();
  };

  const [btnIndex, setBtnIndex] = useState(0);
  return (
    <BetPointSecWrapper {...props}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="slider_btn_stack"
      >
        <Button onClick={prev}>
          <SliderLeftArrow />
        </Button>
        <Button onClick={next}>
          <SliderRightArrow />
        </Button>
      </Stack>
      <Slider ref={sliderRef} {...settings}>
        {betNumberList?.map((data, index) => (
          <Box className="each_slide" key={index}>
            <Button
              className={btnIndex === index ? "isActive" : ""}
              onClick={() => setBtnIndex(index)}
            >
              {data}
            </Button>
          </Box>
        ))}
      </Slider>
    </BetPointSecWrapper>
  );
};

export default BetPointSec;
