import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const JackPortHomeMainWrapper = styled(Box)`
  .wrapper_listJackprt {
    position: relative;
    border-radius: 0;
    padding: 0;
    margin-top: 40px;
    .weeklytextwrap {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 3;
      p {
        color: #28a1f5;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .weekly {
        color: #a8ddf3;
        font-size: 12px;
        font-weight: 800;
      }
    }
    figure {
      position: relative;
      padding: 25px 0;
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
    }
    .allTextWrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      z-index: 3;
    }
    .imgBitcoin {
      position: relative;
      line-height: 0;
      font-size: 0;
      margin-top: -38px;
      width: 170px;
      img {
        width: 100%;
      }
    }
    .textFirst {
      position: relative;
      padding: 0 0 0 115px;
      z-index: 1;
      h4 {
        font-weight: 700;
        font-size: 40px;
        letter-spacing: -0.01em;
        line-height: 1;
        text-transform: uppercase;
        color: ${primaryColors.colorfed92d};
        text-shadow: 0px 4px 30px ${primaryColors?.colorfee338};

        @media (min-width: 1921px) {
          font-size: 2vw;
        }
        @media (max-width: 1599px) {
          font-size: 40px;
        }
        @media (max-width: 1399px) {
          font-size: 30px;
        }
        span {
          color: ${primaryColors.textPrimaryColor};
          text-shadow: 0px 4px 30px ${primaryColors.textPrimaryColor};
        }
      }
    }
    .textScnd {
      position: relative;
      padding: 0 70px 0 0;
      z-index: 1;

      @media (max-width: 1399px) {
        padding: 0 35px 0 0;
      }
      h4 {
        font-weight: 700;
        font-size: 40px;
        letter-spacing: -0.01em;
        color: ${primaryColors.textPrimaryColor};
        line-height: 1;
        text-shadow: 0px 4px 30px ${primaryColors.textPrimaryColor};
        @media (min-width: 1921px) {
          font-size: 2vw;
        }
        @media (max-width: 1599px) {
          font-size: 40px;
        }
        @media (max-width: 1399px) {
          font-size: 30px;
        }
        span {
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          font-size: 50px;
          letter-spacing: -0.01em;
          color: ${primaryColors.colorff7424};
          line-height: 1;
          @media (max-width: 1599px) {
            font-size: 40px;
          }
          @media (max-width: 1399px) {
            font-size: 30px;
          }
        }
      }
    }
  }
`;
