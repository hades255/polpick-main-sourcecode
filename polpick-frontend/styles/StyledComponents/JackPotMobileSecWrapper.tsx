import { primaryColors } from "@/themes/_muiPalette";
import { goldman } from "@/themes/_muiTheme";
import { Box, styled } from "@mui/material";

export const JackPotMobileSecWrapper = styled(Box)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* margin: 0 -25px -30px -25px; */
  margin: 0 -25px;
  padding: 25px 0;
  /* position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  height: 38vh; */
  /* img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  } */
  figure {
    /* position: relative;
    padding: 50px 0 0 0; */
    line-height: 0;
    font-size: 0;
    width: 100%;
    height: 100%;
  }
  .jackpot_lottie {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .bgImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%);
    z-index: 9;
    /* width: 100%; */
    text-align: center;
    h6 {
      font-weight: 800;
      font-size: 10px;
      text-align: center;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${primaryColors?.colora8ddf3};
    }
    h5 {
      font-family: ${goldman?.style?.fontFamily};
      font-weight: 700;
      font-size: 30px;
      text-align: center;
      letter-spacing: -0.05em;
      text-transform: uppercase;
      color: ${primaryColors?.color28a1f5};
    }
    h3 {
      font-weight: 700;
      font-size: 34px;
      line-height: 1;
      text-align: center;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 30px ${primaryColors?.colorfff9f8};
      margin-bottom: 10px;
      span {
        font-weight: 500;
        font-size: 24px;
        text-shadow: 0px 4px 30px ${primaryColors?.colorfff9f8};
      }
    }
    p {
      font-weight: 800;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${primaryColors?.colorfde136};
    }
  }
`;
