import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const VictoryContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: scaleup linear 500ms;
  @keyframes scaleup {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .victory_txt {
    max-width: 870px;
    @media (min-width: 2000px) {
      max-width: 100%;
    }
    @media (max-width: 599px) {
      max-width: 500px;
    }
  }
  .lotteiwinner {
    margin-bottom: -80px;
    position: relative;
    z-index: 5;
  }
  .victorylottie {
  }
  .victory_cup {
    max-width: 200px;
    margin-top: -100px;
    position: relative;
    z-index: 2;
    @media (min-width: 2000px) {
      max-width: 322px;
      margin-top: -120px;
    }
    @media (max-width: 599px) {
      max-width: 150px;
      margin-top: -50px;
    }
  }
  .earned_block {
    width: 320px;
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -130px;
    background: radial-gradient(
      ellipse at center,
      rgba(241, 199, 24, 0.11) 0%,
      rgba(251, 139, 34, 0.27) 100%
    );
    border-radius: 100%;
    padding: 2px;
    position: relative;
    @media (max-width: 599px) {
      width: 320px;
      height: 320px;
      margin-top: -70px;
    }
    .earned_block_most_otr {
      background: #1d233d;
      box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;

      border-radius: 100%;
      padding: 23px;

      position: relative;
      z-index: 1;
      @media (max-width: 599px) {
        padding: 13px;
      }
    }
    .earned_block_otr {
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #efc54e 0%, #fc8523 100%);
      border-radius: 100%;
      padding: 3px;
    }
    .earned_block_inner {
      width: 100%;
      height: 100%;

      background: radial-gradient(ellipse at center, #302c31 0%, #4f3a2f 100%);
      box-shadow: 0px 4px 50px rgba(241, 195, 33, 0.3),
        inset 0px 4px 60px rgba(241, 195, 9, 0.2);
      border-radius: 100%;

      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 3px;
        top: 3px;
        right: 3px;
        bottom: 3px;
        z-index: 1;
      }
      .earned_contents {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        z-index: 5;
        h4 {
          font-weight: 800;
          font-size: 34px;
          text-align: center;
          letter-spacing: -0.01em;
          margin-bottom: 15px;
          color: ${primaryColors?.textPrimaryColor};
          @media (max-width: 599px) {
            font-size: 20px;
          }
        }
        h3 {
          font-weight: 700;
          font-size: 80px;
          line-height: 1;
          text-align: center;
          letter-spacing: -0.01em;
          background: radial-gradient(
              95.83% 95.83% at 16.67% 4.17%,
              #f0c21d 0%,
              #ff7424 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(255, 116, 36, 0.5);
          margin-bottom: 35px;
          i {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            filter: drop-shadow(0px 4px 20px rgba(255, 116, 36, 0.5));
            margin-right: 5px;
          }
          @media (max-width: 599px) {
            font-size: 50px;
            margin-bottom: 20px;
          }
        }
        button {
          border: 0;
          background: linear-gradient(137.81deg, #f3b61f 14.71%, #ff7824 96%);
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(2px);
          border-radius: 16px;
          padding: 0;
          width: 190px;
          height: 54px;
          font-weight: 600;
          font-size: 16px;
          line-height: 1;
          text-align: center;
          letter-spacing: -0.01em;
          color: ${primaryColors?.white};
          &:hover {
            background: linear-gradient(137.81deg, #ff7824 14.71%, #f3b61f 96%);
          }
        }
      }
    }
  }
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-50%);
    z-index: 9;
    background: transparent;
  }
`;
