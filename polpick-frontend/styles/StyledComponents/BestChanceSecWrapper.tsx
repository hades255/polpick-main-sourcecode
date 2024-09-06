import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const BestChanceSecWrapper = styled(Box)`
  position: relative;
  height: 1750px;
  margin-top: -550px;

  /* @media (max-width: 1699px) {
    margin: -300px 0;
  } */
  @media (max-width: 1199px) {
    height: 1230px;
    margin-top: -400px;
  }
  @media (max-width: 599px) {
    height: 600px;
    margin-top: -100px;
  }
  .content {
    text-align: center;
    button {
      min-width: 240px;
      margin-top: 70px;
      min-height: 80px;
      font-size: 24px;
      font-weight: 700;
      @media (max-width: 1199px) {
        min-width: 190px;
        min-height: 60px;
        font-size: 18px;
      }
      @media (max-width: 599px) {
        min-width: auto;
        min-height: auto;
        font-size: 14px;
        margin-top: 30px;
      }
    }
  }
  .best_chance_bg_img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content_wrap {
    position: absolute;
    top: 35%;
    width: 100%;
    z-index: 6;
    .content {
      h1 {
        font-size: 130px;
        font-weight: 900;
        text-align: center;
        letter-spacing: -0.02em;
        margin-top: -90px;
        color: ${primaryColors?.textPrimaryColor};
        position: relative;
        z-index: 10;
        text-shadow: 0px 20px 20px rgba(4, 4, 4, 0.5);
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
      }
    }
  }
`;
