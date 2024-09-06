import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const AffiliateProgramSecWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-80%);
    top: 0;
    background: rgba(52, 209, 106, 0.2);
    filter: blur(150px);
    z-index: 2;
    @media (max-width: 899px) {
      display: none;
    }
  }
  &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    right: 50%;
    transform: translateX(150%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: 2;
    @media (max-width: 899px) {
      display: none;
    }
  }
  .affiliate_sec {
    background: ${primaryColors?.color040E10};
    position: relative;
    z-index: 1;
    @media (max-width: 899px) {
      margin-top: 50px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 330px;
      height: 100%;
      right: -45%;
      top: 0;
      background: ${primaryColors?.color040E10};
      filter: blur(50px);
      z-index: 2;
      @media (max-width: 899px) {
        display: none;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 254px;
      height: 100%;
      left: 30%;
      top: 0;
      background: ${primaryColors?.color040E10};
      filter: blur(50px);
      z-index: 2;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  .affiliate_content {
    width: 380px;
    padding: 150px 0 200px;
    /* margin-left: auto; */
    position: relative;
    z-index: 3;
    @media (max-width: 1199px) {
      padding: 100px 0;
    }
    @media (max-width: 899px) {
      padding: 0;
      width: 100%;
    }
    h3 {
      font-weight: 700;
      font-size: 24px;
      line-height: 1.5;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      margin-bottom: 40px;
      @media (max-width: 899px) {
        font-size: 20px;
      }
    }
    p {
      font-weight: 500;
      font-size: 18px;
      color: rgba(236, 243, 255, 0.5);
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      line-height: 2;
      margin-bottom: 50px;
      @media (max-width: 899px) {
        font-size: 16px;
      }
    }
    button {
      min-width: 200px;
    }
  }
  .affiliate_fig {
    position: absolute;
    right: -20%;
    top: -30px;
    max-width: 1500px;
    height: 100%;
    z-index: 1;
    @media (max-width: 1199px) {
      max-width: 520px;
      right: -7%;
    }
    @media (max-width: 899px) {
      position: static;
      max-width: 100%;
      margin-top: 50px;
    }
    &::after {
      content: "";
      position: absolute;
      width: 310px;
      height: 210px;
      left: 0;
      top: 55%;
      transform: translateY(-50%);
      background: rgba(52, 209, 106, 0.4);
      filter: blur(150px);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 420px;
      height: 320px;
      right: 0%;
      bottom: 35%;
      background: rgba(220, 46, 44, 0.4);
      filter: blur(150px);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
    figure {
      width: 100%;
      height: 100%;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 420px;
        height: 320px;
        left: 0;
        top: 40%;
        transform: translateY(-50%);
        background: rgba(52, 209, 106, 0.4);
        filter: blur(150px);
        z-index: 1;
      }
      &::before {
        content: "";
        position: absolute;
        width: 420px;
        height: 320px;
        right: 10%;
        bottom: 6%;
        background: rgba(220, 46, 44, 0.4);
        filter: blur(150px);
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
