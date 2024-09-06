import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const HomeWrapper = styled(Box)`
  position: relative;
  .sub_header {
    position: absolute;
    left: 0;
    top: 200px;
    width: 100%;
    z-index: 1;
    @media screen {
    }
    h3 {
      /* display: inline-block; */
      font-weight: 500;
      font-size: 24px;
      line-height: 1.5;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      text-align: center;
      @media (max-width: 899px) {
        font-size: 16px;
      }
      @media (max-width: 599px) {
        font-size: 12px;
      }
    }
  }
`;

export const BannerSecWrapper = styled(Box)`
  height: 100%;
  &.transform_banner {
    /* .banner_fig {
      figure {
        transform: translateY(130px);
      }
    } */
    .banner_txt {
      top: 15%;
      bottom: auto;
      h2 {
      }
      @media (max-width: 899px) {
        top: 17%;
        &::before {
          display: none;
        }
      }
      @media (max-width: 599px) {
        top: 20%;
      }
      &::after {
        display: none;
      }
    }
  }
  position: relative;
  @media (max-width: 1199px) {
    height: 100vh;
  }
  @media (max-width: 899px) {
    height: auto;
  }
  @media (max-width: 599px) {
    height: 400px;
    padding-top: 78px;
  }
  /* &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 447.58px;
    right: 0;
    top: 329.69px;
    background: ${primaryColors?.colordc2e2c};
    filter: blur(200px);
    z-index: 2;
    @media (max-width: 899px) {
      width: 150px;
      height: 150px;
      top: 160px;
      filter: blur(100px);
    }
  } */
  /* &::after {
    content: "";
    position: absolute;
    width: 334px;
    height: 303px;
    right: 100px;
    top: 210px;
    background: ${primaryColors?.colordc2e2c};
    filter: blur(150px);
    z-index: 3;
  } */
  .banner_fig {
    margin-top: 0;
  }
  .banner_txt {
    position: absolute;
    left: 0;
    bottom: 18%;
    width: 100%;
    height: auto;
    z-index: 5;
    text-align: center;
    @media (max-width: 899px) {
      top: 0;
      position: static;
      margin-top: -140px;
    }
    /* @media (max-width: 599px) {
      top: 30%;
    } */
    /* &::before {
      content: "";
      position: absolute;
      width: 447.58px;
      height: 377.94px;
      left: 111.35px;
      top: 259.34px;
      background: ${primaryColors?.color34d16a};
      filter: blur(350px);
      z-index: 2;
      @media (max-width: 899px) {
        width: 150px;
        height: 150px;
        top: 160px;
        filter: blur(100px);
      }
    } */
    /* &::after {
      content: "";
      position: absolute;
      width: 1321.63px;
      height: 287.64px;
      left: 279.39px;
      top: -181.45px;
      background: ${primaryColors?.color0c1012};
      filter: blur(70px);
      z-index: 2;
      @media (max-width: 899px) {
        width: 100%;
        height: 287.64px;
        left: 0;
      }
    } */
    h1 {
      font-weight: 800;
      font-size: 110px;
      line-height: 0.9;
      letter-spacing: -0.02em;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 20px 20px rgba(4, 4, 4, 0.5);

      position: relative;
      z-index: 10;
      @media (max-width: 1699px) {
        margin-top: -40px;
        font-size: 90px;
      }
      @media (max-width: 1199px) {
        margin-top: -20px;
        font-size: 60px;
      }
      @media (max-width: 599px) {
        margin-top: 0px;
        font-size: 30px;
      }
      &.small_banner_heading {
        font-size: 80px;
        margin-top: -40px;
        text-transform: lowercase;
        @media (max-width: 1199px) {
          font-size: 50px;
        }
        @media (max-width: 899px) {
          margin-top: -20px;
        }
        @media (max-width: 599px) {
          font-size: 30px;
          margin-top: 0px;
        }
        span {
          display: block;
          font-size: 90px;
          -webkit-text-stroke: 1.5px ${primaryColors?.textPrimaryColor};
          color: transparent;
          text-shadow: 0px 20px 20px rgba(4, 4, 4, 0.5);
          margin-bottom: -13px;
          @media (max-width: 1199px) {
            font-size: 70px;
          }
          @media (max-width: 899px) {
            font-size: 50px;
          }
          @media (max-width: 599px) {
            font-size: 30px;
            margin: 0;
          }
        }
      }
    }
    .banner_mdl_sec {
      margin-top: 400px;
      @media (max-width: 1499px) {
        margin-top: 200px;
      }
      @media (max-width: 899px) {
        margin-top: 50px;
      }
      h1 {
        font-size: 130px;
        @media (max-width: 1199px) {
          font-size: 90px;
        }
        @media (max-width: 899px) {
          font-size: 50px;
        }
        @media (max-width: 599px) {
          font-size: 30px;
        }
        span {
          margin-bottom: 0;
          margin-top: -40px;
          @media (max-width: 899px) {
            margin-top: -20px;
          }
          @media (max-width: 599px) {
            margin-top: 0px;
          }
        }
      }
    }
    .pool_card_wrapper {
      position: relative;
    }
    .play_now_btn {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 38px;
      button {
        height: 80px;
        font-size: 24px;
        padding-left: 64px;
        padding-right: 64px;
        @media (max-width: 1199px) {
          padding-left: 64px;
          padding-right: 64px;
          height: 60px;
          font-size: 18px;
        }
        @media (max-width: 599px) {
          padding-left: 40px;
          padding-right: 40px;
          height: auto;
          font-size: 16px;
        }
      }
    }
    .left_pool_card {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
      width: 310px;
      /* background: rgba(40, 44, 70, 0.6); */
      backdrop-filter: blur(25px);
      border-radius: 30px;
      @media (max-width: 1199px) {
        width: 180px;
      }
      @media (max-width: 899px) {
        width: 140px;
      }
      @media (max-width: 599px) {
        top: 10px;
      }
      img {
        filter: drop-shadow(0px 10px 100px rgba(0, 0, 0, 0.15));
        transform: scale(1.15);
        margin: 2px 0 -10px;
        border-radius: 30px;
      }
    }
    .rgt_pool_card {
      position: absolute;
      right: 80px;
      top: 70px;
      z-index: 5;
      width: 310px;
      /* background: rgba(255, 255, 255, 0.06); */
      backdrop-filter: blur(25px);
      border-radius: 30px;
      @media (max-width: 1199px) {
        width: 180px;
      }
      @media (max-width: 899px) {
        width: 140px;
        top: 20px;
      }
      @media (max-width: 599px) {
        top: 10px;
        right: 0;
      }
      img {
        filter: drop-shadow(0px 10px 100px rgba(0, 0, 0, 0.15));
        transform: scale(1.15);
        margin: 2px 0 -10px;
        border-radius: 30px;
      }
    }
  }
`;
