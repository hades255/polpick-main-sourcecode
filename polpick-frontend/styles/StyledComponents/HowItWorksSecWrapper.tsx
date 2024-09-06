/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const HowItWorksSecWrapper = styled(Box)`
padding: 100px 0;
  .how_sec {
    max-width: 1210px;
    margin: 0 auto;
    padding-top: 126px;
    position: relative;
    z-index: 1;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: ${primaryColors?.color4a567f};
      opacity: 0.2;
      position: absolute;
      left: 0;
      top: 95px;
      z-index: -1;
      @media (max-width: 899px) {
        display: none;
      }
    }
    @media (max-width: 899px) {
      padding-top: 50px;
    }
  }
`;

export const HowItWorkCardWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "themeColor"
})<{
  themeColor: "blue" | "green" | "orange";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(
    130.08deg,
    rgba(40, 44, 70, 0.3) 9.73%,
    rgba(55, 69, 130, 0.3) 95.02%
  );
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  position: relative;
  z-index: 1;
  margin-top: 125px;

  .number_block {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -185px;
    z-index: 3;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${primaryColors?.color040E10};
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 100%;
    font-weight: 700;
    font-size: 20px;
    line-height: 1;
    transition: all 0.3s ease;
    color: ${({ themeColor }) =>
      themeColor === "blue"
        ? `${primaryColors?.color4F80FF}`
        : themeColor === "green"
        ? `${primaryColors?.color34d16a}`
        : themeColor === "orange"
        ? `${primaryColors?.colorff7424}`
        : `${primaryColors?.textPrimaryColor}`};
    text-shadow: ${({ themeColor }) =>
      themeColor === "blue"
        ? `0px 5px 20px ${primaryColors?.color4F80FF}`
        : themeColor === "green"
        ? `0px 5px 20px ${primaryColors?.color34d16a}`
        : themeColor === "orange"
        ? `0px 5px 20px ${primaryColors?.colorff7424}`
        : `0px 5px 20px ${primaryColors?.textPrimaryColor}`};
    @media (max-width: 899px) {
      top: -135px;
    }
    &::after {
      content: "";
      width: 1px;
      height: 68px;
      background-color: ${primaryColors?.color4a567f};
      opacity: 0.2;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -90px;
      z-index: -1;
      @media (max-width: 899px) {
        height: 35px;
        bottom: -50px;
      }
    }
  }
  &:hover {
    background: ${({ themeColor }) =>
      themeColor === "blue"
        ? `   linear-gradient(
      149.06deg,
      rgba(72, 79, 123, 0.3) 18.74%,
      rgba(79, 129, 255, 0.3) 100%
    )`
        : themeColor === "green"
        ? `   linear-gradient(
      149.06deg,
      rgba(72, 79, 123, 0.3) 18.74%,
      rgba(47, 94, 63, 0.3) 100%
    )`
        : themeColor === "orange"
        ? `   linear-gradient(
      149.06deg,
      rgba(72, 79, 123, 0.3) 18.74%,
      rgba(255, 116, 36, 0.3) 100%
    )`
        : ``};

    .number_block {
      border-color: ${({ themeColor }) =>
        themeColor === "blue"
          ? `${primaryColors?.color4F80FF}`
          : themeColor === "green"
          ? `${primaryColors?.color34d16a}`
          : themeColor === "orange"
          ? `${primaryColors?.colorff7424}`
          : `${primaryColors?.textPrimaryColor}`};
      &:after {
        opacity: 0.8;
        background-color: ${({ themeColor }) =>
          themeColor === "blue"
            ? `${primaryColors?.color4F80FF}`
            : themeColor === "green"
            ? `${primaryColors?.color34d16a}`
            : themeColor === "orange"
            ? `${primaryColors?.colorff7424}`
            : `${primaryColors?.color4a567f}`};
      }
    }
  }
  .win_card_inner_wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    border-radius: 32px;
    z-index: 3;
  }

  .card_icon_block {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
    margin-top: -80px;
    position: relative;
    z-index: 10;
    @media (max-width: 599px) {
      margin-bottom: 30px;
    }
    .card_icon,
    .card_icon_clone {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 200px;

      @media (max-width: 599px) {
        height: 150px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .card_icon_clone {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(10px, -10px);
      z-index: -1;
      img {
        opacity: 0.5;
        filter: blur(25px);
        transform: rotate(0.02deg);
      }
    }
  }
  .content {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 2;
      max-width: 288px;
      margin: 0 auto;
      color: rgba(236, 243, 255, 0.5);
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    }
    h3 {
      font-weight: 700;
      font-size: 24px;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      margin-bottom: 20px;
    }
  }
`;
