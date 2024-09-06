import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const WeeklyjackpotWrapper = styled(Box)`
  .jackpot_sec {
    background: ${primaryColors?.color040E10};
    position: relative;
    z-index: 1;
    @media (max-width: 899px) {
      margin-top: 20px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 745px;
      height: 100%;
      right: -40%;
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
      left: -50%;
      top: 0;
      background: ${primaryColors?.color040E10};
      filter: blur(50px);
      z-index: 2;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  .jackpot_content {
    width: 420px;
    padding: 250px 0 200px;
    margin-left: auto;
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
  .jackpot_fig {
    position: absolute;
    left: -40%;
    top: -30px;
    max-width: 1500px;
    height: 100%;
    z-index: 1;
    @media (max-width: 1199px) {
      left: -25%;
      max-width: 850px;
    }
    @media (max-width: 899px) {
      position: static;
      max-width: 100%;
      margin-bottom: 30px;
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
        left: 20%;
        top: 40%;
        transform: translateY(-50%);
        background: rgba(52, 209, 106, 0.3);
        filter: blur(150px);
        z-index: 1;
        @media (max-width: 899px) {
          width: 200px;
          height: 200px;
          filter: blur(100px);
        }
      }
      &::before {
        content: "";
        position: absolute;
        width: 420px;
        height: 320px;
        right: 15%;
        bottom: 15%;
        background: rgba(220, 46, 44, 0.3);
        filter: blur(150px);
        z-index: 1;
        @media (max-width: 899px) {
          width: 200px;
          height: 200px;
          filter: blur(100px);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
